// this_file: src/ast.rs

//! AST (Abstract Syntax Tree) representation for SVG documents
//! 
//! This module defines the AST node types that match svgo's internal representation.
//! For MVP 1.2.0, this is simplified to avoid complex visitor patterns.

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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
}

impl ParentNode for XastNode {
    fn children(&self) -> &[XastNode] {
        match self {
            XastNode::Root(root) => &root.children,
            XastNode::Element(element) => &element.children,
            _ => &[],
        }
    }

    fn children_mut(&mut self) -> &mut Vec<XastNode> {
        match self {
            XastNode::Root(root) => &mut root.children,
            XastNode::Element(element) => &mut element.children,
            _ => {
                // Return empty Vec for nodes that can't have children
                // This is a limitation of the trait design, but works for MVP
                static mut EMPTY: Vec<XastNode> = Vec::new();
                unsafe { &mut EMPTY }
            }
        }
    }
}

/// Root node of an SVG document
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastRoot {
    pub children: Vec<XastNode>,
}

/// SVG element node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastElement {
    pub name: String,
    pub attributes: HashMap<String, String>,
    pub children: Vec<XastNode>,
}

/// Text content node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastText {
    pub value: String,
}

/// Comment node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastComment {
    pub value: String,
}

/// DOCTYPE declaration node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastDoctype {
    pub name: String,
    pub public_id: Option<String>,
    pub system_id: Option<String>,
}

/// Processing instruction node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastInstruction {
    pub name: String,
    pub value: String,
}

/// CDATA section node
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct XastCdata {
    pub value: String,
}

/// Simplified visitor result for basic traversal
#[derive(Debug, Clone, PartialEq)]
pub enum VisitResult {
    /// Continue traversing to children
    Continue,
    /// Skip children of this node
    Skip,
    /// Stop traversal completely
    Stop,
}

/// Basic tree traversal function for simple operations
/// This replaces the complex visitor pattern for MVP
pub fn traverse_tree<F>(node: &mut XastNode, callback: &mut F) 
where
    F: FnMut(&mut XastNode) -> VisitResult,
{
    match callback(node) {
        VisitResult::Stop => return,
        VisitResult::Skip => return,
        VisitResult::Continue => {}
    }

    // Visit children
    match node {
        XastNode::Root(root) => {
            for child in &mut root.children {
                traverse_tree(child, callback);
            }
        }
        XastNode::Element(element) => {
            for child in &mut element.children {
                traverse_tree(child, callback);
            }
        }
        _ => {} // Leaf nodes have no children
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_node_creation() {
        let root = XastRoot {
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
        };

        assert_eq!(root.children.len(), 1);
        assert_eq!(root.children[0].node_type(), "element");
    }

    #[test]
    fn test_basic_traversal() {
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

        let mut count = 0;
        traverse_tree(&mut root, &mut |_node| {
            count += 1;
            VisitResult::Continue
        });

        assert_eq!(count, 3); // root + element + text
    }
}