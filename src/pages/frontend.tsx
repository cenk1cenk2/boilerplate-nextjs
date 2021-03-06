import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Fragment, FunctionComponent } from 'react'
import { DeepPartial } from 'ts-essentials'

import { Template } from '@components/template'
import { TemplateProps } from '@components/template/index.interface'
import { getNavigationItems } from '@hooks/getNavigationItems'

export const getStaticProps: GetStaticProps<DeepPartial<Props>> = async () => {
  return {
    props: {
      template: {
        items: await getNavigationItems()
      }
    }
  }
}

interface Props {
  template: TemplateProps
}

export const FrontendTemplate: FunctionComponent<Props> = ({ template }) => {
  return (
    <Fragment>
      <Head>
        <title>Frontend Page Title</title>
      </Head>
      <Template {...template}>
        An empty page
      </Template>
    </Fragment>
  )
}

export default FrontendTemplate