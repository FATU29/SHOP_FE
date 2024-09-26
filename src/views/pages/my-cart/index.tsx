import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  Checkbox
} from '@mui/material'
import { NextPage } from 'next'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import FallbackSpinner from 'src/components/fall-back'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { formatCurrencyVND } from 'src/utils'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import { updateProductToCart } from 'src/stores/order-products'
import { TItemOrderProduct } from 'src/types/order-products'
import { useAuth } from 'src/hooks/useAuth'
import CustomModal from 'src/components/custom-modal'
import CofirmDialog from 'src/components/cofirmation-dialog'

type TProps = {}

const MyCartPage: NextPage<TProps> = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [openCofirmDialog, setOpenCofirmDialog] = useState<any>({
    open: false
  })

  const { user } = useAuth()
  const { t } = useTranslation()
  const router = useRouter()

  const { orderItems } = useSelector((state: RootState) => state.cartProducts)
  const dispatch: AppDispatch = useDispatch()

  const handleComDetailPage = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  const handleOnCloseCofirmDialog = () => {
    const newObject = { open: false }
    setOpenCofirmDialog(newObject)
  }

  const handleSelectedRows = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    if (isChecked) {
      const index = selectedRows.findIndex((item: string) => item === e.target.value)
      if (index < 0) {
        selectedRows.push(e.target.value)
        setSelectedRows([...selectedRows])
      } else {
        return
      }
    } else {
      if (selectedRows) {
        const productId = e.target.value
        const filerRow = selectedRows.filter((item: string) => item !== productId)
        setSelectedRows([...filerRow])
      }
    }
  }

  const handleSelectAllRows = (e: ChangeEvent<HTMLInputElement>) => {
    const checkSeletedAllRows = e.target.checked
    if (checkSeletedAllRows) {
      const dataInLocal = getLocalProductCart()
      const products = dataInLocal ? JSON.parse(dataInLocal as string) : {}
      if (user?._id) {
        const myProducts = products[user._id]
        const selectAll = myProducts?.map((item: TItemOrderProduct) => {
          if (!selectedRows.includes(item?.product)) {
            selectedRows.push(item?.product)
          }
        })
        setSelectedRows([...selectedRows])
      }
    } else {
      setSelectedRows([])
    }
  }

  const handleDeleteCart = (id?: string) => {
    const dataInLocal = getLocalProductCart()
    const products = dataInLocal ? JSON.parse(dataInLocal as string) : {}

    if (user) {
      const dataUserProducts = products[user?._id]
      const newDataUserProducts = dataUserProducts?.filter((item: TItemOrderProduct) => item.product !== id)
      const newMemory = JSON.parse(JSON.stringify(newDataUserProducts))
      dispatch(
        updateProductToCart({
          orderItems: newMemory
        })
      )
      setLocalProductToCart({ ...products, [user._id]: newDataUserProducts })
    }
  }

  const handleDecreaseCart = (id: string, amount: number) => {
    const dataInLocal = getLocalProductCart()
    const products = dataInLocal ? JSON.parse(dataInLocal as string) : {}

    if (user) {
      const index = products[user?._id].findIndex((item: TItemOrderProduct) => item.product === id)
      if (index >= 0) {
        const newMemory = JSON.parse(JSON.stringify(orderItems))
        const checkMinus = newMemory[index].amount - amount
        if (checkMinus <= 0) {
          return
        }
        newMemory[index].amount -= amount
        dispatch(
          updateProductToCart({
            orderItems: newMemory
          })
        )
        setLocalProductToCart({ ...products, [user?._id]: newMemory })
      }
    }
  }

  const handleIncreseCart = (id: string, amount: number) => {
    const dataInLocal = getLocalProductCart()
    const products = dataInLocal ? JSON.parse(dataInLocal as string) : {}
    const newMemory = JSON.parse(JSON.stringify(orderItems))

    if (user) {
      if (products[user?._id]) {
        const index = products[user?._id].findIndex((item: TItemOrderProduct) => item.product === id)
        if (index >= 0) {
          newMemory[index].amount += amount
          const newProducts = [...newMemory]
          dispatch(
            updateProductToCart({
              orderItems: newProducts
            })
          )
          if (newProducts) {
            setLocalProductToCart({ ...products, [user?._id]: newProducts })
          }
        }
      }
    }
  }

  const handleDeleteMultiple = () => {
    if (selectedRows.length > 0) {
      const dataInLocal = getLocalProductCart()
      const products = dataInLocal ? JSON.parse(dataInLocal as string) : {}
      const deleteMultiple = orderItems.filter((item: TItemOrderProduct) => !selectedRows.includes(item.product))
      dispatch(
        updateProductToCart({
          orderItems: deleteMultiple
        })
      )
      setSelectedRows([])
      if (user?._id) {
        setLocalProductToCart({ ...products, [user?._id]: deleteMultiple })
      }
    }
  }

  const allProductsInCart = useMemo(() => {
    const allProductsId = orderItems?.map((item: TItemOrderProduct) => {
      return item?.product
    })
    return allProductsId
  }, [orderItems])

  return (
    <>
      {loading && <FallbackSpinner></FallbackSpinner>}
      <CofirmDialog
        open={openCofirmDialog}
        onClose={handleOnCloseCofirmDialog}
        handleAction={handleDeleteMultiple}
        title={t('Cofirm form')}
        description={t("If you delete products, it can't recover")}
      ></CofirmDialog>

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: 5,
          borderRadius: 2,
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {orderItems?.length > 0 && (
          <>
            <Box
              sx={{
                width: '100%',
                padding: 3.8
              }}
            >
              <Grid container spacing={2} justifyItems={'center'} alignItems={'center'}>
                <Grid item md={1}>
                  <Checkbox
                    checked={allProductsInCart.length === selectedRows.length}
                    onChange={e => handleSelectAllRows(e)}
                  ></Checkbox>
                </Grid>
                <Grid item md={4}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}
                  >
                    {t('Image')}
                  </Typography>
                </Grid>
                <Grid md={4} item>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}
                  >
                    {t('Detail')}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}
                  >
                    {t('Quantity')}
                  </Typography>
                </Grid>
                <Grid item md={1}>
                  {selectedRows.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}
                    >
                      <IconButton
                        onClick={() => setOpenCofirmDialog({ open: true })}
                        sx={{
                          width: '35px',
                          height: '35px',
                          padding: 0,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0,0,0,0.1)'
                        }}
                      >
                        <IconifyIcon icon='ic:round-delete' style={{ color: 'red' }}></IconifyIcon>
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        {Array.isArray(orderItems) &&
          orderItems?.map((item: any) => {
            return (
              <>
                <MenuItem
                  sx={{
                    width: '100%',
                    height: 'auto',
                    cursor: 'unset'
                  }}
                >
                  <Grid container spacing={5} justifyItems={'center'} alignItems={'center'}>
                    <Grid item md={1}>
                      <Checkbox
                        checked={selectedRows?.includes(item?.product)}
                        value={item?.product}
                        onChange={e => {
                          handleSelectedRows(e)
                        }}
                      ></Checkbox>
                    </Grid>
                    <Grid
                      item
                      md={4}
                      sx={{
                        width: { xs: '100%', md: '200px' },
                        height: { xs: '100%', md: '120px' }
                      }}
                    >
                      <Tooltip title={t('Click_to_show_details')}>
                        <Image
                          onClick={() => handleComDetailPage(item.slug)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            cursor: 'pointer'
                          }}
                          width={0}
                          height={0}
                          src={item?.image}
                          alt={item?.name}
                        ></Image>
                      </Tooltip>
                    </Grid>
                    <Grid item direction={'column'} md={4}>
                      <Grid item md={5}>
                        <Box
                          sx={{
                            width: '250px'
                          }}
                        >
                          <Typography
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              '-webkitBoxOrient': 'vertical',
                              '-webkitLineClamp': '2',
                              textWrap: 'wrap'
                            }}
                          >
                            {item?.name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        {item?.discount &&
                        item?.discountEndDate &&
                        item?.discountStartDate &&
                        item?.discount &&
                        Date.now() <= new Date(item?.discountEndDate).getDate() &&
                        Date.now() >= new Date(item?.discountStartDate).getTime() ? (
                          <>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                gap: 4
                              }}
                            >
                              <Typography color={theme.palette.primary.main} variant='h6' fontWeight={'bold'}>
                                {formatCurrencyVND(item?.discount)}
                              </Typography>
                              <Typography
                                sx={{
                                  textDecoration: 'line-through'
                                }}
                                color={'red'}
                                variant='h6'
                                fontWeight={'bold'}
                              >
                                {formatCurrencyVND(item?.price)}
                              </Typography>
                            </Box>
                          </>
                        ) : (
                          <>
                            <Typography color={theme.palette.primary.main} variant='h6' fontWeight={'bold'}>
                              {formatCurrencyVND(item?.price)}
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item md={2} display={'flex'} justifyContent={'center'}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 3
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            handleDecreaseCart(item?.product, 1)
                          }}
                          sx={{
                            width: '35px',
                            height: '35px',
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.1)'
                          }}
                        >
                          <IconifyIcon icon='ic:round-remove' style={{ color: 'red' }}></IconifyIcon>
                        </IconButton>
                        <TextField
                          sx={{
                            width: '60px',
                            '& input': {
                              padding: '8px 0',
                              '-moz-appearance': 'textfield',
                              textAlign: 'center'
                            },
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                              '-webkit-appearance': 'none',
                              margin: 0
                            },
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)'
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)'
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: 'rgba(0, 0, 0, 0.23)'
                              }
                            }
                          }}
                          type='number'
                          value={item?.amount}
                          disabled
                        ></TextField>
                        <IconButton
                          onClick={() => {
                            handleIncreseCart(item?.product, 1)
                          }}
                          sx={{
                            width: '35px',
                            height: '35px',
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.1)'
                          }}
                        >
                          <IconifyIcon icon='ic:round-add' style={{ color: 'green' }}></IconifyIcon>
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item md={1}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center'
                        }}
                      >
                        <IconButton
                          onClick={() => handleDeleteCart(item?.product)}
                          sx={{
                            width: '35px',
                            height: '35px',
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.1)'
                          }}
                        >
                          <IconifyIcon icon='ic:round-delete' style={{ color: 'red' }}></IconifyIcon>
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </MenuItem>
              </>
            )
          })}
        {Array.isArray(orderItems) && orderItems?.length > 0 && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Button variant='contained'>{t('Buy_now')}</Button>
            </Box>
          </>
        )}
        {Array.isArray(orderItems) && orderItems?.length <= 0 && (
          <>
            <MenuItem>
              <Typography
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {t('No_Products')}
              </Typography>
            </MenuItem>
          </>
        )}
      </Box>
    </>
  )
}

export default MyCartPage
