import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email, password, metadata) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  return { data, error }
}

export const updatePassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  })
  return { data, error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Database helper functions
export const fetchDocuments = async (category = null) => {
  let query = supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data, error } = await query
  return { data, error }
}

export const fetchRecentDocuments = async (limit = 8) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

export const fetchFavoriteDocuments = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('document_id, documents(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const toggleFavorite = async (userId, documentId) => {
  // Check if already favorited
  const { data: existingFavorite, error: checkError } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('document_id', documentId)
    .single()
  
  if (checkError && checkError.code !== 'PGRST116') {
    return { error: checkError }
  }
  
  if (existingFavorite) {
    // Remove favorite
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('document_id', documentId)
    
    return { data: null, error }
  } else {
    // Add favorite
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id: userId, document_id: documentId }
      ])
    
    return { data, error }
  }
}

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
  
  return { data, error }
}

export const fetchOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const fetchOrderDetails = async (orderId) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, products(*)')
    .eq('order_id', orderId)
  
  return { data, error }
}

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true })
  
  return { data, error }
}

export const fetchTopProducts = async (limit = 4) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sales_count', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

export const fetchAnnouncements = async (limit = 3) => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

export const fetchUserMetrics = async (userId) => {
  const { data, error } = await supabase
    .from('user_metrics')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const fetchSalesData = async (userId, period = 'month') => {
  const { data, error } = await supabase
    .from('sales_data')
    .select('*')
    .eq('user_id', userId)
    .eq('period', period)
    .order('date', { ascending: true })
  
  return { data, error }
}
