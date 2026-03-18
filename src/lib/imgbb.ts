const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

export interface ImgBBResponse {
  success: boolean;
  data: {
    url: string;
    url_viewer: string;
    display_url: string;
    title: string;
    filename: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  error?: {
    message: string;
    code: number;
  };
}

/**
 * Upload une image vers ImgBB
 * @param file Fichier image (File ou base64 string)
 * @returns URL de l'image uploadée
 */
export async function uploadToImgBB(file: File | string): Promise<string> {
  let base64: string;
  
  if (typeof file === 'string') {
    // C'est déjà une chaîne base64
    base64 = file;
  } else {
    // Convertir le fichier en base64
    base64 = await fileToBase64(file);
  }

  const formData = new FormData();
  formData.append('key', IMGBB_API_KEY);
  formData.append('image', base64);

  const response = await fetch(IMGBB_API_URL, {
    method: 'POST',
    body: formData,
  });

  const data: ImgBBResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error?.message || 'Erreur upload image');
  }

  return data.data.url;
}

/**
 * Convertir un fichier en chaîne base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Enlever le préfixe data:image/xxx;base64, pour ne garder que le base64
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploader plusieurs images vers ImgBB
 * @param files Tableau de fichiers
 * @returns Tableau d'URLs
 */
export async function uploadMultipleToImgBB(files: (File | string)[]): Promise<string[]> {
  const urls: string[] = [];
  
  for (const file of files) {
    try {
      const url = await uploadToImgBB(file);
      urls.push(url);
    } catch (error) {
      console.error('Erreur upload image:', error);
      // Continuer avec les autres images même si une échoue
    }
  }
  
  return urls;
}
