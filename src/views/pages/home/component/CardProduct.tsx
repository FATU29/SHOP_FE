import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Collapse, IconButton, IconButtonProps, Rating, styled, Tooltip, Typography, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import { GridMoreVertIcon } from '@mui/x-data-grid';
import { t } from 'i18next';
import * as React from 'react';
import FallbackSpinner from 'src/components/fall-back';
import IconifyIcon from 'src/components/Icon';
import { TProduct } from 'src/types/products';



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
    5: 'Excellent+',
};

const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface TCardProduct {
    item: TProduct
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));



const CardProduct = (props: TCardProduct) => {
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);
    const theme = useTheme();


    const { item } = props;

    return (
        <>
            {(isLoadingCheck) && <FallbackSpinner></FallbackSpinner>}
            <Card
                sx={{
                    width: "100%",
                    padding: 2,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: `rgba(100, 100, 111, 0.5) 0px 7px 29px 0px`,
                }}>
                {/* <CardHeader
                    sx={{
                        padding: 3
                    }}
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                /> */}
                <CardMedia
                    component="img"
                    height="160"
                    image={item?.image}
                    alt="Paella dish"
                />
                <CardContent sx={{
                    padding: 5
                }}>
                    <Typography color={theme.palette.primary.main} variant='h5' fontWeight={"bold"}>{item?.name}</Typography>
                    {item?.discount ? (
                        <>
                            <Box sx={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}>
                                <Typography color={theme.palette.primary.main} variant='h6' fontWeight={"bold"}>{item?.price} VND</Typography>
                                <Typography sx={{
                                    textDecoration:"line-through"
                                }} color={"red"} variant='h6' fontWeight={"bold"}>{item?.discount} VND</Typography>
                            </Box>
                        </>)
                        : (<><Typography color={theme.palette.primary.main} variant='h6' fontWeight={"bold"}>{item?.price} VND</Typography></>)
                    }
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Left <b>{item?.countInStock}</b> product in stock
                    </Typography>
                </CardContent>
                <CardActions sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2
                }}>
                    <Box>
                        <Tooltip title="Review" arrow>
                            <Rating
                                name="hover-feedback"
                                value={item?.averageRating}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                readOnly
                                size='small'
                            />
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title={"Like"} arrow>
                            <IconButton>
                                <IconifyIcon icon={"mdi:heart-outline"}></IconifyIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share" arrow>
                            <IconButton>
                                <IconifyIcon icon={"material-symbols:share-outline"}></IconifyIcon>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add_to_cart" arrow>
                            <IconButton>
                                <IconifyIcon icon={"gridicons:add-outline"}></IconifyIcon>
                            </IconButton>
                        </Tooltip>

                    </Box>

                </CardActions>
                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Button type="submit" variant="contained" size="large">
                        {t("Buy_Now")}
                    </Button>
                </Box>
            </Card>
        </>
    );
}


export default CardProduct;