import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// ────────────────────────────────────────────────────
// Helper to extract ID from params
// ────────────────────────────────────────────────────
type Params = { id: string };

// ────────────────────────────────────────────────────
// GET /API/products/[id]
//  Fetch a single product by its ID
// ────────────────────────────────────────────────────
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      // Supabase returns PGRST116 when single() finds no rows
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.error(`GET /API/products/[id] error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { action } = body;
    
    // ────────────────────────────────────────────────────
    // PUT /API/products/[id]
    //  Update a product (partial or full)
    // ────────────────────────────────────────────────────
    if (action === "update") {

      // Build the update object dynamically
      const { name, description, price, stock, category } = body;

      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price !== undefined) updateData.price = price;
      if (stock !== undefined) updateData.stock = stock;
      if (category !== undefined) updateData.category = category;

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json(
          { error: 'No valid fields provided to update.' },
          { status: 400 }
        );
      }

      const { data: product, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(
        { message: 'Product updated successfully', product },
        { status: 200 }
      );
    }

    // ────────────────────────────────────────────────────
    // ADD TO CART 
    // body = { userId, amount }
    // ────────────────────────────────────────────────────
    if (action === "addCart") {
      const { userId, amount } = body;

      const { data: product, error: productError } = await supabase
        .from('products')
        .select('price')
        .eq('id', id)
        .single();
      if (productError) {
        if (productError.code === 'PGRST116') {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ error: productError.message }, { status: 500 });
      }

      const cartProduct = {
        id,
        price: product.price,
        amount,
      };

      const { data: userCart, error: userCartError } = await supabase
        .from('users')
        .select('cart')
        .eq('id', userId)
        .single();
      if (userCartError) {
        return NextResponse.json({ error: userCartError.message }, { status: 500 });
      }
      
      const currentCart = userCart.cart || [];
      const newCart = [...currentCart, cartProduct];

      const { data: updatedCart, error: updatedCartError } = await supabase
        .from('users')
        .update({ cart: newCart })
        .eq('id', id)
      if (updatedCartError) {
        return NextResponse.json({ error: updatedCartError.message }, { status: 500 })
      }
 
      return NextResponse.json(
        { message: 'Cart updated successfully', updatedCart },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error(`PUT /API/products/[id] error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

// ────────────────────────────────────────────────────
// DELETE /API/products/[id]
//  Delete a product
// ────────────────────────────────────────────────────
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Supabase delete doesn't error if the row didn't exist, it just returns empty.
    // We'll just return success.
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`DELETE /API/products/[id] error:`, error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
