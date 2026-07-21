import { supabase, isSupabaseConfigured, MEDIA_BUCKET } from './supabase'

export type UploadResult = { url: string; persisted: boolean }

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Uploads a file to Supabase Storage and returns its public URL.
 * If Supabase isn't configured yet (no env vars), falls back to a
 * local object URL so the admin UI still works for previewing —
 * that URL only lives in this browser tab and will not survive a
 * refresh or show up for other visitors. `persisted` tells you which
 * case you're in.
 */
export async function uploadMediaFile(file: File, folder: string): Promise<UploadResult> {
  if (!isSupabaseConfigured || !supabase) {
    return { url: URL.createObjectURL(file), persisted: false }
  }

  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, ''))}.${ext}`

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Upload failed, falling back to local preview:', error.message)
    return { url: URL.createObjectURL(file), persisted: false }
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, persisted: true }
}
