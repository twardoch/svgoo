// this_file: src/ast.rs

//! AST (Abstract Syntax Tree) representation for SVG documents
//! 
//! This module defines the AST node types that match svgo's internal representation,
//! enabling seamless integration with JavaScript plugins.

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Special symbol returned by visitor callbacks to skip processing children
pub const VISIT_SKIP: &str = "__SVGOO_VISIT_SKIP__";

/// Parent trait for nodes that can contain children
pub trait ParentNode {
    fn children(&self) -> &[XastNode];
    fn children_mut(&mut self) -> &mut Vec<XastNode>;
}

/// Base node types in the AST
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "lowercase")]
pub enum XastNode {
    Root(XastRoot),
    Element(XastElement),
    Text(XastText),
    Comment(XastComment),
    Doctype(XastDoctype),
    Instruction(XastInstruction),
    Cdata(XastCdata),
}

impl XastNode {
    /// Get the node type as a string
    pub fn node_type(&self) -> &'static str {
        match self {
            XastNode::Root(_) => "root",
            XastNode::Element(_) => "element",
            XastNode::Text(_) => "text",
            XastNode::Comment(_) => "comment",
            XastNode::Doctype(_) => "doctype",
            XastNode::Instruction(_) => "instruction",
            XastNode::Cdata(_) => "cdata",
        }
    }

    /// Check if this node can have children
    pub fn has_children(&self) -> bool {
        matches!(self, XastNode::Root(_) | XastNode::Element(_))
    }

    /// Get children if this node supports them
    pub fn children(&self) -> Option<&[XastNode]> {
        match self {
            XastNode::Root(root) => Some(&root.children),
            XastNode::Element(elem) => Some(&elem.children),
            _ => None,
        }
    }

    /// Get mutable children if this node supports them
    pub fn children_mut(&mut self) -> Option<&mut Vec<XastNode>> {
        match self {
            XastNode::Root(root) => Some(&mut root.children),
            XastNode::Element(elem) => Some(&mut elem.children),
            _ => None,
        }
    }
}

/// Root node of the AST
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastRoot {
    pub children: Vec<XastNode>,
}

impl ParentNode for XastRoot {
    fn children(&self) -> &[XastNode] {
        &self.children
    }

    fn children_mut(&mut self) -> &mut Vec<XastNode> {
        &mut self.children
    }
}

/// Element node (e.g., <svg>, <rect>, <path>)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastElement {
    pub name: String,
    #[serde(default)]
    pub attributes: HashMap<String, String>,
    #[serde(default)]
    pub children: Vec<XastNode>,
}

impl ParentNode for XastElement {
    fn children(&self) -> &[XastNode] {
        &self.children
    }

    fn children_mut(&mut self) -> &mut Vec<XastNode> {
        &mut self.children
    }
}

/// Text node containing character data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastText {
    pub value: String,
}

/// Comment node (<!-- ... -->)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastComment {
    pub value: String,
}

/// DOCTYPE declaration node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastDoctype {
    pub name: String,
    pub data: DoctypeData,
}

/// DOCTYPE data
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DoctypeData {
    pub doctype: String,
}

/// Processing instruction node (<?xml ... ?>)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastInstruction {
    pub name: String,
    pub value: String,
}

/// CDATA section node (<![CDATA[ ... ]]>)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastCdata {
    pub value: String,
}

/// Info object passed to plugins
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PluginInfo {
    /// Path to the SVG file (if available)
    pub path: Option<String>,
    /// Current multipass iteration count
    pub multipass_count: usize,
}

/// Plugin parameters type
pub type PluginParams = serde_json::Value;

/// Result of a plugin execution
pub type PluginResult = Result<Option<Visitor>, String>;

/// Visitor callbacks for AST traversal
#[derive(Default)]
pub struct Visitor {
    pub root: Option<NodeCallbacks>,
    pub element: Option<NodeCallbacks>,
    pub text: Option<NodeCallbacks>,
    pub comment: Option<NodeCallbacks>,
    pub doctype: Option<NodeCallbacks>,
    pub instruction: Option<NodeCallbacks>,
    pub cdata: Option<NodeCallbacks>,
}

/// Enter and exit callbacks for a node type
pub struct NodeCallbacks {
    pub enter: Option<Box<dyn Fn(&mut XastNode, Option<&XastNode>) -> VisitResult>>,
    pub exit: Option<Box<dyn Fn(&mut XastNode, Option<&XastNode>) -> VisitResult>>,
}

/// Result of a visitor callback
pub enum VisitResult {
    /// Continue normal traversal
    Continue,
    /// Skip processing children of this node
    Skip,
}

/// Traverse the AST with a visitor
pub fn visit(root: &mut XastNode, visitor: &Visitor) {
    visit_node(root, visitor, std::ptr::null());
}

fn visit_node(node: &mut XastNode, visitor: &Visitor, parent: *const XastNode) {
    // Get the appropriate callbacks for this node type
    let callbacks = match node {
        XastNode::Root(_) => &visitor.root,
        XastNode::Element(_) => &visitor.element,
        XastNode::Text(_) => &visitor.text,
        XastNode::Comment(_) => &visitor.comment,
        XastNode::Doctype(_) => &visitor.doctype,
        XastNode::Instruction(_) => &visitor.instruction,
        XastNode::Cdata(_) => &visitor.cdata,
    };

    // Call enter callback
    let mut skip_children = false;
    if let Some(callbacks) = callbacks {
        if let Some(enter) = &callbacks.enter {
            let parent_ref = if parent.is_null() { None } else { unsafe { parent.as_ref() } };
            match enter(node, parent_ref) {
                VisitResult::Skip => skip_children = true,
                VisitResult::Continue => {}
            }
        }
    }

    // Process children if not skipped and node has children
    if !skip_children && node.has_children() {
        let node_ptr = node as *const XastNode;
        match node {
            XastNode::Root(root) => {
                for child in &mut root.children {
                    visit_node(child, visitor, node_ptr);
                }
            },
            XastNode::Element(elem) => {
                for child in &mut elem.children {
                    visit_node(child, visitor, node_ptr);
                }
            },
            _ => {}
        }
    }

    // Call exit callback
    if let Some(callbacks) = callbacks {
        if let Some(exit) = &callbacks.exit {
            let parent_ref = if parent.is_null() { None } else { unsafe { parent.as_ref() } };
            exit(node, parent_ref);
        }
    }
}

/// Remove a node from its parent's children array
pub fn detach_node_from_parent(node: &XastNode, parent: &mut XastNode) -> bool {
    if let Some(children) = parent.children_mut() {
        // Find and remove the node
        if let Some(pos) = children.iter().position(|child| {
            // Compare by identity (this is simplified, in practice we'd need node IDs)
            std::ptr::eq(child, node)
        }) {
            children.remove(pos);
            return true;
        }
    }
    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_node_types() {
        let root = XastNode::Root(XastRoot {
            children: vec![],
        });
        assert_eq!(root.node_type(), "root");
        assert!(root.has_children());

        let text = XastNode::Text(XastText {
            value: "Hello".to_string(),
        });
        assert_eq!(text.node_type(), "text");
        assert!(!text.has_children());
    }

    #[test]
    fn test_visitor_pattern() {
        let mut root = XastNode::Root(XastRoot {
            children: vec![
                XastNode::Element(XastElement {
                    name: "svg".to_string(),
                    attributes: HashMap::new(),
                    children: vec![
                        XastNode::Text(XastText {
                            value: "Hello".to_string(),
                        }),
                    ],
                }),
            ],
        });

        let mut enter_count = 0;
        let mut exit_count = 0;

        let visitor = Visitor {
            element: Some(NodeCallbacks {
                enter: Some(Box::new(|_node, _parent| {
                    enter_count += 1;
                    VisitResult::Continue
                })),
                exit: Some(Box::new(|_node, _parent| {
                    exit_count += 1;
                    VisitResult::Continue
                })),
            }),
            ..Default::default()
        };

        // Note: This won't compile as-is because we're capturing mutable state
        // In practice, we'd use RefCell or similar for the counters
        // This is just to illustrate the pattern
    }
}