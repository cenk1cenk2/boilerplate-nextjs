import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'
import config from 'config'
import { NextComponentType, NextPageContext } from 'next'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React, { Fragment } from 'react'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

import { projectDetails } from '@interfaces/project.constants'
import { ITheme } from '@interfaces/styles.interface'
import Theme from '@themes/index'
import PageLoader from '@themes/page-loader'

export default class MyDocument extends Document<{themes: ITheme}> {
  static async getInitialProps (ctx: DocumentContext) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const injectConfig = config.util.toObject()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage( {
          enhanceApp: (App) => (props) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />)
            ),
          enhanceComponent: (Component: NextComponentType<NextPageContext, any, any>) => (props) =>
            <Component {...props} config={injectConfig} />
        } )
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </Fragment>
        ]
      }
    } finally {
      styledComponentSheet.seal()
    }
  }

  render () {
    return (
      <Fragment>
        <Html lang="en">
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" type="text/css" href="/styles/pageloader.css" />
            <meta name="description" content={projectDetails.description} />
            <meta name="author" content={projectDetails.author} />
            <meta name="theme-color" content={Theme.palette.primary.main} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="manifest" href="manifest.json" />
            <style dangerouslySetInnerHTML={{ __html: 'body{display:block}' }} />
          </Head>
          <body>
            <PageLoader />
            <Main />
            <NextScript />
          </body>
        </Html>
      </Fragment>
    )
  }

}
