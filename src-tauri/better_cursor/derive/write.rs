use quote::quote;
use syn::{Data, DeriveInput, Fields, Type};

pub fn impl_struct_write(ast: &DeriveInput) -> proc_macro2::TokenStream {
    let struct_ident = &ast.ident;

    let fields = match &ast.data {
        Data::Struct(ds) => match &ds.fields {
            Fields::Named(named_fields) => &named_fields.named,
            _ => panic!("Support only for named fields"),
        },
        _ => panic!("StructWrite only works on structs"),
    };

    let field_writes = fields.iter().map(|field| {
        let field_name = &field.ident;
        let ty = &field.ty;
        let write_expr = get_writer_call(ty);

        quote! {
            #write_expr(&self.#field_name)?;
        }
    });

    let expanded = quote! {
        impl StructWrite for #struct_ident {
            fn write<W: BetterWrite + ?Sized>(&self, writer: &mut W) -> Result<u64> {
                let current = writer.current_position()?;
                #(#field_writes)*

                Ok(current)
            }
        }
    };

    expanded
}

pub fn get_writer_call(ty: &Type) -> proc_macro2::TokenStream {
    if let Type::Path(type_path) = ty {
        if let Some(seg) = type_path.path.segments.last() {
            let ident_str = seg.ident.to_string();
            match ident_str.as_str() {
                "u8" => quote! { writer.write_u8 },
                "u16" => quote! { writer.write_u16 },
                "u32" => quote! { writer.write_u32 },
                "u64" => quote! { writer.write_u64 },
                "f32" => quote! { writer.write_f32 },
                "f64" => quote! { writer.write_f64 },
                _ => {
                    quote! {
                        writer.write_struct
                    }
                }
            }
        } else {
            panic!("Unexpected type in StructWrite. Path has no segments?");
        }
    } else if let Type::Array(array) = ty {
        let elem_ty = &*array.elem;

        if let Type::Path(elem_type_path) = elem_ty {
            if let Some(seg) = elem_type_path.path.segments.last() {
                let ident_str = seg.ident.to_string();
                match ident_str.as_str() {
                    "u8" => {
                        return quote! {
                            writer.write_buffer
                        };
                    }
                    _ => {
                        panic!("Unsupported array element type in StructWrite");
                    }
                }
            }
        }
        panic!("Unsupported array element type in StructWrite");
    } else {
        panic!("StructWrite: only works with primitive types (u8, u16, etc.)");
    }
}
