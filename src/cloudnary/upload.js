import axios from "axios";

export default async function UploadImagem(imagem) {
  if (!imagem) return '';

  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;

  const formData = new FormData();
  formData.append('file', imagem);
  formData.append('upload_preset', 'ml_default');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    return '';
  }
}