'use client'

import { Toolbar } from '@mui/material'
import Head from 'next/head'
import { getAllProductTypes } from 'src/services/product-type'
import { getAllProducts, getAllProductsPublic } from 'src/services/products'
import productType from 'src/stores/product-type'
import { TProduct } from 'src/types/products'
import LayoutNoApp from 'src/views/layouts/LayoutNoApp'
import HomePage from 'src/views/pages/home'

interface TOptions {
  label: string
  value: string
}


interface TProps {
  products: TProduct[]
  total: number,
  productTypes:TOptions[]
  params: {
    limit: number
    page: number
    order: string
    productSelected:string
  }
}



export default function Home(props: TProps) {
  const { products, total, params,productTypes } = props

  return (
    <>
      <Head>
        <title>SHOP APP</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePage products={products} total={total} paramsServer={params} productTypesServer={productTypes}></HomePage>
    </>
  )
}

Home.guestGuard = false
Home.authGuard = false
Home.getLayout = (page: React.ReactNode) => <LayoutNoApp>{page}</LayoutNoApp>

export async function getServerSideProps() {
  const limit = 10
  const page = 1
  const order = 'createdAt desc'

  try {
    const resType = await getAllProductTypes({ params: { limit: -1, page: -1 } })
    const dataType = resType?.data?.productTypes.map((item: any) => {
      return {
        label: item.name,
        value: item._id
      }
    })


    const res = await getAllProductsPublic({ params: { limit, page, order,productType:dataType[0].value } })
    const data = res?.data
    return {
      props: {
        products: data?.products,
        total: data?.totalCount,
        productTypes:dataType,
        params: {
          limit,
          page,
          order,
          productSelected:dataType[0].value
        }
      }
    }
  } catch (error) {
    console.log('error in ServerSideProps ', error)
    return {
      props: {
        products: [],
        total: 0,
        params: {
          limit,
          page,
          order
        }
      }
    }
  }
}
