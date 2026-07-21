import { useRef, useState } from 'react'
import { ImagePlus, Film, X, Loader2, CloudOff } from 'lucide-react'
import { uploadMediaFile } from '../../lib/upload'
import { isSupabaseConfigured } from '../../lib/supabase'

type Props = {
  productFolder: string
  images: string[]
  onImagesChange: (urls: string[]) => void
  video: string | null
  onVideoChange: (url: string | null) => void
}

export default function MediaUploader({
  productFolder,
  images,
  onImagesChange,
  video,
  onVideoChange,
}: Props) {
  const imgInput = useRef<HTMLInputElement>(null)
  const videoInput = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState<'image' | 'video' | null>(null)

  const handleImagePick = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading('image')
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const { url } = await uploadMediaFile(file, `${productFolder}/images`)
      uploaded.push(url)
    }
    onImagesChange([...images, ...uploaded])
    setUploading(null)
    if (imgInput.current) imgInput.current.value = ''
  }

  const handleVideoPick = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading('video')
    const { url } = await uploadMediaFile(files[0], `${productFolder}/video`)
    onVideoChange(url)
    setUploading(null)
    if (videoInput.current) videoInput.current.value = ''
  }

  return (
    <div className="space-y-5">
      {!isSupabaseConfigured && (
        <div className="flex items-center gap-2 text-[12px] text-[#c98f4a] bg-[#241d10] border border-[#3a2e14] rounded-lg px-3.5 py-2.5">
          <CloudOff className="w-3.5 h-3.5 flex-none" />
          Supabase isn't connected yet — uploads preview here but won't persist or be visible
          to other visitors until env vars are set.
        </div>
      )}

      {/* Photos */}
      <div>
        <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-2">
          Photos
        </label>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url + i} className="relative w-20 h-24 rounded-lg overflow-hidden group">
              <img src={url} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onImagesChange(images.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] bg-white/90 text-[#0d0f16] px-1.5 py-0.5 rounded font-medium">
                  Cover
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => imgInput.current?.click()}
            disabled={uploading === 'image'}
            className="w-20 h-24 rounded-lg border border-dashed border-[#2a2c3a] flex flex-col items-center justify-center gap-1.5 text-[#6c6f80] hover:border-[#c46a4e] hover:text-[#c46a4e] transition-colors"
          >
            {uploading === 'image' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImagePlus className="w-4 h-4" />
            )}
            <span className="text-[10px]">Add</span>
          </button>
          <input
            ref={imgInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleImagePick(e.target.files)}
          />
        </div>
        <div className="text-[11px] text-[#5c5f6e] mt-2">
          First photo is used as the cover image. Drop several for the product gallery.
        </div>
      </div>

      {/* Video */}
      <div>
        <label className="block text-[11.5px] uppercase tracking-wider text-[#8a8d9c] mb-2">
          Video (optional)
        </label>
        {video ? (
          <div className="relative w-36 rounded-lg overflow-hidden">
            <video src={video} className="w-full aspect-video object-cover" muted />
            <button
              type="button"
              onClick={() => onVideoChange(null)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => videoInput.current?.click()}
            disabled={uploading === 'video'}
            className="w-36 aspect-video rounded-lg border border-dashed border-[#2a2c3a] flex flex-col items-center justify-center gap-1.5 text-[#6c6f80] hover:border-[#c46a4e] hover:text-[#c46a4e] transition-colors"
          >
            {uploading === 'video' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Film className="w-4 h-4" />
            )}
            <span className="text-[10px]">Upload video</span>
          </button>
        )}
        <input
          ref={videoInput}
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => handleVideoPick(e.target.files)}
        />
        <div className="text-[11px] text-[#5c5f6e] mt-2">
          Shown on the product page as a playable clip next to the photos — good for the sand art
          pieces where motion is the whole point.
        </div>
      </div>
    </div>
  )
}
