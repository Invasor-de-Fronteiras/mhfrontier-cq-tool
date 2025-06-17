use quote::quote;
use syn::{Data, DeriveInput, Expr, ExprLit, Fields, Lit, Type};

pub fn impl_struct_read(ast: &DeriveInput) -> proc_macro2::TokenStream {
    let struct_ident = &ast.ident;

    let fields = match &ast.data {
        Data::Struct(ds) => match &ds.fields {
            Fields::Named(named_fields) => &named_fields.named,
            _ => panic!("Support only for named fields"),
        },
        _ => panic!("StructRead only works on structs"),
    };

    let field_reads = fields.iter().map(|field| {
        let field_name = &field.ident;
        let ty = &field.ty;
        let read_expr = get_reader_call(ty);

        quote! {
            #field_name: #read_expr
        }
    });

    let expanded = quote! {
        impl StructRead for #struct_ident {
            fn read<R: BetterRead + ?Sized>(reader: &mut R) -> Result<Self> {
                Ok(Self {
                    #(#field_reads),*
                })
            }
        }
    };

    expanded
}

pub fn get_reader_call(ty: &Type) -> proc_macro2::TokenStream {
    if let Type::Path(type_path) = ty {
        if let Some(seg) = type_path.path.segments.last() {
            let ident_str = seg.ident.to_string();

            match ident_str.as_str() {
                "u8" => quote! { reader.read_u8()? },
                "u16" => quote! { reader.read_u16()? },
                "u32" => quote! { reader.read_u32()? },
                "u64" => quote! { reader.read_u64()? },
                "f32" => quote! { reader.read_f32()? },
                "f64" => quote! { reader.read_f64()? },
                _ => {
                    quote! {
                        #ty::read(reader)?
                    }
                }
            }
        } else {
            panic!("Unexpected type in StructRead. Path has no segments?");
        }
    } else if let Type::Array(array) = ty {
        let elem_ty = &*array.elem;
        let len_expr = &array.len;
        let length: usize = if let Expr::Lit(ExprLit {
            lit: Lit::Int(lit_int),
            ..
        }) = len_expr
        {
            lit_int
                .base10_parse::<usize>()
                .expect("Array length must be a valid integer literal")
        } else {
            panic!("Array length must be a literal integer (e.g. [u8; 10])");
        };

        if let Type::Path(elem_type_path) = elem_ty {
            if let Some(seg) = elem_type_path.path.segments.last() {
                let ident_str = seg.ident.to_string();
                match ident_str.as_str() {
                    "u8" => {
                        return quote! {
                            {
                                let mut buffer = [0u8; #length];
                                reader.read_exact(&mut buffer)?;

                                buffer
                            }
                        };
                    }
                    _ => {
                        panic!("Unsupported array element type in StructRead");
                    }
                }
            }
        }
        panic!("Unsupported array element type in StructRead");
    } else {
        panic!("Unsupported type kind in StructRead. Only Path or Array so far.");
    }
}
