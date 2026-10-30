
import { supabase } from './supabase'

export async function salvarCheckin(form, fotoWebPath) {
  try {
    let fotoUrl = null
    let fotoPath = null

    // Enviar a foto para o Storage
    if (fotoWebPath) {
      const resposta = await fetch(fotoWebPath)
      const blob = await resposta.blob()

      const nomeArquivo = `veiculo-${Date.now()}.jpg`

      const { data: arquivo, error: erroFoto } =
        await supabase.storage
          .from('fotos-camera')
          .upload(nomeArquivo, blob, {
            contentType: blob.type || 'image/jpeg',
            upsert: false
          })

      if (erroFoto) throw erroFoto

      fotoPath = arquivo.path

      const { data: urlData } = supabase.storage
        .from('fotos-camera')
        .getPublicUrl(fotoPath)

      fotoUrl = urlData.publicUrl
    }

    // Salvar todos os campos no Database
    const { data, error } = await supabase
      .from('relatorios')
      .insert([{
        nome_cliente: form.cliente,
        placa: form.placa,
        modelo_veiculo: form.modelo,
        nivel_combustivel: form.tanque,
        estado_lataria: form.lataria,
        observacoes: form.observacoes,
        foto_url: fotoUrl,
        foto_path: fotoPath
      }])
      .select()
      .single()

    if (error) throw error

    return data

  } catch (error) {
    console.error('Erro ao salvar relatório:', error)
    throw error
  }
}
