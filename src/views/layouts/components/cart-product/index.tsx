import { Badge, Box, Divider, Grid, IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material'
import { NextPage } from 'next'
import React, { use, useEffect, useMemo } from 'react'
import IconifyIcon from '../../../../components/Icon'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { TItemOrderProduct } from 'src/types/order-products'
import { getLocalProductCart } from 'src/helpers/storage'
import { updateProductToCart } from 'src/stores/order-products'
import { useAuth } from 'src/hooks/useAuth'
import Image from 'next/image'
import { Height } from '@mui/icons-material'
import { formatCurrencyVND } from 'src/utils'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {}

const CartProducts: NextPage<TProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { t } = useTranslation()
  const { orderItems } = useSelector((state: RootState) => state.cartProducts)
  const theme = useTheme()
  const user = useAuth()
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleComDetailPage = (slug: string) => () => {
    router.push(`/${ROUTE_CONFIG.PRODUCT}/${slug}`)
  }

  useEffect(() => {
    const productCart = getLocalProductCart()
    const parseData = JSON.parse(productCart as string)
    if (user?.user?._id && parseData !== null) {
      dispatch(
        updateProductToCart({
          orderItems: parseData[user?.user?._id]
        })
      )
    }
  }, [user.user])

  const totalItemsCart = useMemo(() => {
    let total: number = 0
    if (Array.isArray(orderItems)) {
      total = orderItems?.reduce((result, current: TItemOrderProduct) => {
        return result + current?.amount
      }, 0)
    }
    return total
  }, [orderItems])

  return (
    <>
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title={t('Cart_Products')}>
            <IconButton onClick={handleClick} size='small' color='inherit'>
              <Badge color='primary' badgeContent={totalItemsCart}>
                <IconifyIcon icon={'mdi:cart-outline'}></IconifyIcon>
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              p: 3,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box
            sx={{
              overflow: 'auto',
              overflowX: 'hidden',
              width: '100%',
              maxHeight: '400px'
            }}
          >
            {Array.isArray(orderItems) && orderItems?.map((item: any) => {
              return (
                <>
                  <Tooltip title={t('Click_to_show_details')} onClick={handleComDetailPage(item.slug)}>
                    <MenuItem
                      sx={{
                        width: '100%',
                        height: 'auto'
                      }}
                    >
                      <Grid container spacing={5}>
                        <Grid
                          item
                          md={4}
                          sx={{
                            width: { xs: '100%', md: '200px' },
                            height: { xs: '100%', md: '120px' }
                          }}
                        >
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain'
                            }}
                            width={0}
                            height={0}
                            src={item?.image}
                            alt={item?.name}
                          ></Image>
                        </Grid>
                        <Grid item container direction={'column'} md={5}>
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
                            Date.now() <= new Date(item?.discountEndDate).getTime() &&
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
                              gap: 1
                            }}
                          >
                            <Typography
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 'bold'
                              }}
                            >
                              Amount:
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 'bold'
                              }}
                            >
                              {item?.amount}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </Tooltip>
                </>
              )
            })}
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
          {Array.isArray(orderItems) && orderItems?.length > 0 && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 2
                }}
              >
                <Button
                  onClick={() => {
                    router.push(`${ROUTE_CONFIG.MY_CART}`)
                  }}
                  variant='contained'
                >
                  {t('View_your_cart')}
                </Button>
              </Box>
            </>
          )}
        </Menu>
      </React.Fragment>
    </>
  )
}

export default CartProducts
