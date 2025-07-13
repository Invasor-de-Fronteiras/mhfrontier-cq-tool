use proc_macro::TokenStream;
use syn::{parse_macro_input, DeriveInput};
mod read;
mod write;

#[proc_macro_derive(StructRead)]
pub fn derive_struct_read(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let gen = read::impl_struct_read(&ast);
    gen.into()
}

#[proc_macro_derive(StructWrite)]
pub fn derive_struct_write(input: TokenStream) -> TokenStream {
    let ast = parse_macro_input!(input as DeriveInput);
    let gen = write::impl_struct_write(&ast);
    gen.into()
}
