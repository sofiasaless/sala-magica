export function NotificacaoObj (tituloNot, descricaoNot, redirecionamento, tipo, usuario_notificado) {
  return {
    tituloNot: tituloNot,
    descricaoNot: descricaoNot,
    redirecionamento: redirecionamento,
    tipo: tipo,
    usuario_notificado: usuario_notificado,
    lido: false,
    dataNotificacao: new Date()
  }
}