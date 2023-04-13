export interface errorInterface {
  errorStatusCode?: string
  errorMessage?: string
}

const errorHandler = (status: string, message: string): string => {
  if (status === '400' && message === 'Error: Invalid password') {
    return 'Email ou senha incorretos.'
  }

  if (status === '404' && message === 'Error: User not found') {
    return 'Email ou senha incorretos.'
  }

  if (status === '401' && message === 'Error: This user not verify email') {
    return 'Este usuário precisar confirmar seu email, enviamos novamente o email de confirmação.'
  }

  if (status === '409' && message === 'Error: User email alredy exist') {
    return 'Já existe um usuário com este email.'
  }

  if (status === '404' && message === 'Error: User not exist') {
    return 'Não existe usuário com este email.'
  }

  if (status === '401' && message === 'Error: This user alredy verify email') {
    return 'Este usuário já tem o email verficado.'
  }

  if (status === '401' && message === 'Error: Invalid secret token for this email') {
    return 'Token inválido.'
  }

  if (status === '400' && message === 'Error: An error occured when verify this email') {
    return 'Ocorreu um erro ao verificar o email deste usuário.'
  }

  if (status === '401' && message === 'This user dont have password') {
    return 'Este usuário não pode redefinir sua senha.'
  }

  if (status === '401' && message === 'Error: Invalid reset token for this email') {
    return 'Token inválido.'
  }

  if (status === '400' && message === 'Error: An error occured when update this password') {
    return 'Ocorreu um erro ao redefinir a senha deste usuário.'
  }

  return 'Ocorreu um erro ao comunicar com o servidor.'
}

export { errorHandler }
