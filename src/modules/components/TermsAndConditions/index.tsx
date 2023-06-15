import React from 'react'
import useStyles from './styles'
import ModalWithScroll from '../ModalWithScroll'

interface InterfaceTermsAndConditionsProps {
  open: boolean
  closeAction: () => void
}

const TermsAndConditions = (props: InterfaceTermsAndConditionsProps): JSX.Element => {
  const { open, closeAction } = props
  const classes = useStyles()
  return (
    <>
      <ModalWithScroll
        open={open}
        title={'Termos e condições'}
        description={
          <div className={classes.divContentModalScroll}>
            <p className={classes.textModalScroll}>1. Escambooks é uma rede social voltada para a interação entre
            os usuários e a troca de livros;</p>
            <p className={classes.textModalScroll}>2. Os dados dos usuários cadastrados são utilizados por e somente pela plataforma
            Escambooks, a fim de disponibilizar uma melhor usabilidade e experiência. Não disponibilizamos dados de usuários para terceiros, campanhas
            de marketing, anúncios ou mídia social;</p>
            <p className={classes.textModalScroll}>3. Todos os direitos da plataforma são reservados ao Escambooks, qualquer plágio
            será tomado as devidas diretrizes administrativas;</p>
            <p className={classes.textModalScroll}>4. Após o match na plataforma, não nos responsabilizamos por entregas ou recebimentos
            de livros trocados pelos usuários da plataforma, cabe aos mesmos se responsabilizar;</p>
            <p className={classes.textModalScroll}>5. Não nos responsabilizamos pelo uso indevido dos livros publicados pelos
            pequenos autores;</p>
            <p className={classes.textModalScroll}>6. As Atualizações sobre os livros para vestibulares acontencerão a cada seis meses para
            as universidades contempladas.</p>
          </div>
        }
        closeAction={closeAction}
      />
    </>
  )
}

export default TermsAndConditions
