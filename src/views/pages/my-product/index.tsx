import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputSearch from 'src/components/input-search'
import Spinner from 'src/components/spinner'
import { PAGE_SIZE_OPTIONS } from 'src/configs/gridConfig'
import { AppDispatch, RootState } from 'src/stores'
import { getlikeProductMeAction, getViewdProductMeAction } from 'src/stores/products/action'
import CardProduct from '../home/component/CardProduct'
import CustomPagination from 'src/components/custom-pagination'

type TProps = {}

const MyProductsPage: NextPage<TProps> = () => {
  const [listType, setListType] = useState<{ label: string; value: string }[]>([
    {
      value: 'Product_viewed',
      label: 'Đã xem'
    },
    {
      value: 'Product_Liked',
      label: 'Đã thích'
    }
  ])
  const [productTypeSelected, setProductTypeSelected] = useState('Product_viewed')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0])
  const [searchBy, setSearchBy] = useState<string>('')
  const [currentProduct, setCurrentProduct] = useState<any>([])
  const theme = useTheme()

  const dispatch: AppDispatch = useDispatch()
  const { likedProducts, viewedProducts, isLoading } = useSelector((state: RootState) => state.products)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setProductTypeSelected(newValue)
  }

  const handleOnChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const handleGetListProductsViewed = async () => {
    const query = {
      params: {
        limit: pageSize,
        page: page,
        search: searchBy
      }
    }
    dispatch(getViewdProductMeAction(query))
  }

  const handleGetListProductsLiked = async () => {
    const query = {
      params: {
        limit: pageSize,
        page: page,
        search: searchBy
      }
    }
    dispatch(getlikeProductMeAction(query))
  }

  useEffect(() => {
    const run = async () => {
        if (productTypeSelected === 'Product_viewed') {
            await handleGetListProductsViewed()
          } else {
            await handleGetListProductsLiked()
          }
    }
    run();
  }, [productTypeSelected, page, pageSize, searchBy])

  useEffect(() => {
    if (productTypeSelected === 'Product_viewed') {
      setCurrentProduct(viewedProducts); 
    } else {
      setCurrentProduct(likedProducts);  
    }
  }, [viewedProducts, likedProducts, productTypeSelected]);



  return (
    <>
      {isLoading && <Spinner></Spinner>}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 5,
          borderRadius: '10px',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          display: 'flex',
          justifyItems: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box>
            <Tabs value={productTypeSelected} onChange={handleChange}>
              {listType?.map(item => {
                return <Tab key={item?.value} value={item?.value} label={item?.label} />
              })}
            </Tabs>
          </Box>
          <Box>
            <InputSearch value={searchBy} onChange={setSearchBy}></InputSearch>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: 5
          }}
        >
          <Grid container justifyItems={'center'} alignItems={'center'}>
            {currentProduct?.products?.length > 0 ? (
              <>
                {currentProduct.products?.map((item: any) => {
                  return (
                    <Grid item md={3} xs={12}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          p: 5
                        }}
                      >
                        <CardProduct item={item}></CardProduct>
                      </Box>
                    </Grid>
                  )
                })}
              </>
            ) : (
              <>
                <Typography textAlign={'center'} variant='h3'>
                  No_Product
                </Typography>
              </>
            )}
          </Grid>
        </Box>
        {currentProduct?.products?.length > 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width:"100%"
              }}
            >
              <CustomPagination
                rowLength={currentProduct?.totalCount}
                pageSize={pageSize}
                page={page}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onChangePagination={handleOnChangePagination}
              ></CustomPagination>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default MyProductsPage
