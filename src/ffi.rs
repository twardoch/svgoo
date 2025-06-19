// this_file: src/ffi.rs

//! Foreign Function Interface bindings for svgoo
//!
//! This module provides C-compatible FFI bindings for use in Python and C++ applications.

use std::ffi::{CStr, CString};
use std::os::raw::{c_char, c_int};
use std::ptr;

use crate::{optimize_svg, Config};

/// C-compatible result structure
#[repr(C)]
pub struct SvgooResult {
    /// Optimized SVG content (null if error)
    pub data: *mut c_char,
    /// Error message (null if success)
    pub error: *mut c_char,
    /// Success flag (1 = success, 0 = error)
    pub success: c_int,
}

/// Optimize SVG content via C FFI
///
/// # Safety
///
/// This function is unsafe because it deals with raw pointers from C.
/// The caller must ensure:
/// - `svg_content` is a valid null-terminated C string
/// - `config_json` is a valid null-terminated C string (can be null for default config)
/// - The returned result must be freed with `svgoo_free_result`
#[no_mangle]
pub unsafe extern "C" fn svgoo_optimize(
    svg_content: *const c_char,
    config_json: *const c_char,
) -> SvgooResult {
    // Input validation
    if svg_content.is_null() {
        return SvgooResult {
            data: ptr::null_mut(),
            error: create_c_string("SVG content cannot be null"),
            success: 0,
        };
    }

    // Convert C strings to Rust strings
    let svg_str = match CStr::from_ptr(svg_content).to_str() {
        Ok(s) => s,
        Err(_) => {
            return SvgooResult {
                data: ptr::null_mut(),
                error: create_c_string("Invalid UTF-8 in SVG content"),
                success: 0,
            };
        }
    };

    // Parse configuration
    let config = if config_json.is_null() {
        Config::default()
    } else {
        let config_str = match CStr::from_ptr(config_json).to_str() {
            Ok(s) => s,
            Err(_) => {
                return SvgooResult {
                    data: ptr::null_mut(),
                    error: create_c_string("Invalid UTF-8 in config JSON"),
                    success: 0,
                };
            }
        };

        match serde_json::from_str::<Config>(config_str) {
            Ok(c) => c,
            Err(e) => {
                return SvgooResult {
                    data: ptr::null_mut(),
                    error: create_c_string(&format!("Invalid config JSON: {}", e)),
                    success: 0,
                };
            }
        }
    };

    // Perform optimization
    match optimize_svg(svg_str, &config) {
        Ok(optimized) => SvgooResult {
            data: create_c_string(&optimized),
            error: ptr::null_mut(),
            success: 1,
        },
        Err(e) => SvgooResult {
            data: ptr::null_mut(),
            error: create_c_string(&format!("Optimization failed: {}", e)),
            success: 0,
        },
    }
}

/// Free memory allocated by svgoo FFI functions
///
/// # Safety
///
/// This function is unsafe because it deals with raw pointers.
/// The caller must ensure that the result was returned by `svgoo_optimize`.
#[no_mangle]
pub unsafe extern "C" fn svgoo_free_result(result: SvgooResult) {
    if !result.data.is_null() {
        let _ = CString::from_raw(result.data);
    }
    if !result.error.is_null() {
        let _ = CString::from_raw(result.error);
    }
}

/// Get the version string of svgoo
#[no_mangle]
pub extern "C" fn svgoo_version() -> *const c_char {
    static VERSION: &str = concat!(env!("CARGO_PKG_VERSION"), "\0");
    VERSION.as_ptr() as *const c_char
}

/// Helper function to create C strings
fn create_c_string(s: &str) -> *mut c_char {
    match CString::new(s) {
        Ok(cs) => cs.into_raw(),
        Err(_) => {
            // Fallback for strings with null bytes
            match CString::new("Error creating C string") {
                Ok(cs) => cs.into_raw(),
                Err(_) => ptr::null_mut(),
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::ffi::CString;

    #[test]
    fn test_ffi_basic_optimization() {
        let svg = CString::new(r#"<svg xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="100" height="100"/></svg>"#).unwrap();
        let config = CString::new("{}").unwrap();

        unsafe {
            let result = svgoo_optimize(svg.as_ptr(), config.as_ptr());
            assert_eq!(result.success, 1);
            assert!(!result.data.is_null());
            assert!(result.error.is_null());

            svgoo_free_result(result);
        }
    }

    #[test]
    fn test_ffi_null_input() {
        unsafe {
            let result = svgoo_optimize(ptr::null(), ptr::null());
            assert_eq!(result.success, 0);
            assert!(result.data.is_null());
            assert!(!result.error.is_null());

            svgoo_free_result(result);
        }
    }

    #[test]
    fn test_ffi_version() {
        let version_ptr = svgoo_version();
        assert!(!version_ptr.is_null());

        unsafe {
            let version_str = CStr::from_ptr(version_ptr).to_str().unwrap();
            assert!(!version_str.is_empty());
        }
    }
}
