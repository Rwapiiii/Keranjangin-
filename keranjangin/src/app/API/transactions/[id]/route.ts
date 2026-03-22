import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// ────────────────────────────────────────────────────
// Helper to extract ID from params
// ────────────────────────────────────────────────────
type Params = { id: string };

// ────────────────────────────────────────────────────
// GET /API/transactions/[id]
//  Fetch a single transaction by its ID
// ────────────────────────────────────────────────────
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const { data: tx, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();
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
  } catch (error: any) {
    console.error(`GET /API/transactions/[id] error:`, error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}


// ────────────────────────────────────────────────────
// PUT /API/transactions/[id]
//  Update transaction status
// ────────────────────────────────────────────────────
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params;
    
    const { body } = params.json();
    const { newStatus } = body;

    const { data: tx, error } = await supabase
      .from('transactions')
      .update({ status: newStatus })
      .eq('id', id);
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(
      { tx },
      { status: 200 }
    )
  } catch (error: async) {
    console.error(`GET /API/transactions/[id] error:`, error);

    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
     
  }
}
