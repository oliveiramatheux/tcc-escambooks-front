import React from 'react'
import { Helmet } from 'react-helmet-async'

interface InterfacePageDecorator {
  title: string;
  description: string;
}

const PageDecorator = (props: InterfacePageDecorator): JSX.Element => {
  const { title, description } = props
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </>
  )
}

export default PageDecorator
