import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try { 
    const body = await request.json();
    // ────────────────────────────────────────────────────
    // GET /API/transactions/
    //  Fetch transactions relating to the user
    // ────────────────────────────────────────────────────
    if (action === 'fetchAsUser') {
      const { userId } = body;

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('isSeller')
        .eq('id', userId)
        .single();
      if (userError) {
        return NextResponse.json(
          { error: userError.message },
          { status: 500 }
        );
      }

      if (!user.isSeller) {
        const { data: tx, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('buyer', userId);
        if (error) {
          // Supabase returns PGRST116 when single() finds no rows
          if (error.code === 'PGRST116') {
            return NextResponse.json(
              { error: 'Transaction not found' }, 
              { status: 404 }
            );
          }
          return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
          );
        }

        return NextResponse.json(
          { tx }, 
          { status: 200 }
        ); 
      } else {
        const { data: tx, error } = await supabase
          .from('transactions')
          .select('*');
        if (error) {
          // Supabase returns PGRST116 when single() finds no rows
          if (error.code === 'PGRST116') {
            return NextResponse.json(
              { error: 'Transaction not found' }, 
              { status: 404 }
            );
          }

          return NextResponse.json(
            { error: error.message }, 
            { status: 500 }
          );
        }

        const sellerTxs = tx.filter(t => t.products.some(p => p.seller === userId); )

        return NextResponse.json(
          { sellerTxs },
          { status: 200 }
        ); 
      }
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}


// ────────────────────────────────────────────────────
// POST /API/users
//  Body { action: "newTx" } → create a new transaction
// ────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // ──────────────────────────────────────────────────
    // newTx:
    // Required body: { action, buyer, products  }
    // ──────────────────────────────────────────────────
    if (action === 'newTx') {
      const { buyer, products } = body;

      if (!buyer || !products) {
        return NextResponse.json(
          { error: 'buyer, and products are all required' },
          { status: 400 }
        );
      }

      let totalPrice: number = products
        .map(product => product.price)
        .reduce((acc, price) => acc + price, 0);

      // qris/payment api implementation coming soon

      const { data: tx, error, status } = await supabase
        .from('transactions')
        .insert({ buyer, products, totalPrice, qrisData })
        .select();
      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: status }
        )
      }
      
      return NextResponse.json(
        {
          message: 'success',
          tx,
        },
        { status: 200 }
      );
    }

    // ──────────────────────────────────────────────────
    // INVALID ACTION
    // ──────────────────────────────────────────────────
    return NextResponse.json(
      { error: 'Invalid action. Use "newTx".' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

