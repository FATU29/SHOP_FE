import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  IconButton,
  IconButtonProps,
  Rating,
  styled,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material'
import { red } from '@mui/material/colors'
import { GridMoreVertIcon } from '@mui/x-data-grid'
import { t } from 'i18next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FallbackSpinner from 'src/components/fall-back'
import IconifyIcon from 'src/components/Icon'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getLocalProductCart, setLocalProductToCart } from 'src/helpers/storage'
import { useAuth } from 'src/hooks/useAuth'
import { AppDispatch, RootState } from 'src/stores'
import { updateProductToCart } from 'src/stores/order-products'
import { TProduct } from 'src/types/products'
import { convertupdateProductToCart, formatCurrencyVND } from 'src/utils'

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
}

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

interface TCardProduct {
  item: TProduct
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const CardProduct = (props: TCardProduct) => {
  const [value, setValue] = React.useState<number | null>(2)
  const [hover, setHover] = React.useState(-1)
  const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false)
  const theme = useTheme()
  const router = useRouter()
  const user = useAuth()

  const dispatch: AppDispatch = useDispatch()
  const { orderItems } = useSelector((state: RootState) => state.cartProducts)
  const { item } = props

  const handleNavigationDetails = (slug: string) => {
    router.push(`${ROUTE_CONFIG.PRODUCT}/${slug}`)
  }

  const handleupdateProductToCart = (item: TProduct) => {
    const productCart = getLocalProductCart()
    const parseData = productCart ? JSON.parse(productCart as string) : {}
    const listOrderItem = convertupdateProductToCart(orderItems, {
      name: item?.name,
      amount: 1,
      image: item?.image,
      price: item.price,
      discount: item.discount,
      product: item._id,
      slug: item.slug,
      discountStartDate: item.discountStartDate,
      discountEndDate: item.discountEndDate
    })    

    dispatch(
      updateProductToCart({
        orderItems: listOrderItem
      })
    )

    if (user?.user?._id) {
      setLocalProductToCart({ ...parseData, [user?.user?._id]: listOrderItem })
    }
  }

  return (
    <>
      {isLoadingCheck && <FallbackSpinner></FallbackSpinner>}
      <Card
        sx={{
          width: '100%',
          height: '100%',
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `rgba(100, 100, 111, 0.5) 0px 7px 29px 0px`
        }}
      >
        {/* <CardHeader
                    sx={{
                        padding: 3
                    }}
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                /> */}
        <CardMedia
          component='img'
          height='160'
          image={item?.image}
          alt='Paella dish'
          sx={{
            objectFit: 'contain'
          }}
        />
        <CardContent
          sx={{
            padding: 5
          }}
        >
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkitBoxOrient': 'vertical',
              '-webkitLineClamp': '2',
              width: '100%',
              height: '52px'
            }}
            onClick={() => handleNavigationDetails(item?.slug)}
            color={theme.palette.primary.main}
            variant='h5'
            fontWeight={'bold'}
          >
            {item?.name}
          </Typography>
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
                  justifyContent: 'space-between'
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
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Left <b>{item?.countInStock}</b> product in stock
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2
          }}
        >
          <Box>
            <Tooltip title='Review' arrow>
              <Rating
                name='hover-feedback'
                value={item?.averageRating}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
                readOnly
                size='small'
              />
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Like'} arrow>
              <IconButton>
                <IconifyIcon icon={'mdi:heart-outline'}></IconifyIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Share' arrow>
              <IconButton>
                <IconifyIcon icon={'material-symbols:share-outline'}></IconifyIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title='Add_to_cart' arrow>
              <IconButton
                onClick={() => {
                  handleupdateProductToCart(item)
                }}
              >
                <IconifyIcon icon={'gridicons:add-outline'}></IconifyIcon>
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button type='submit' variant='contained' size='large'>
            {t('Buy_Now')}
          </Button>
        </Box>
      </Card>
    </>
  )
}

export default CardProduct
