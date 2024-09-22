
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { FormLabel } from '@mui/material';
import { useTheme } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import FallbackSpinner from 'src/components/fall-back';
import { FILTER_REVIEW_PRODUCT } from 'src/configs/products';



interface TFilterProduct {
    handleFilterProduct:(review:string) => void
}



const FilterProduct = (props: TFilterProduct) => {
    const [isLoadingCheck, setLoadingCheck] = React.useState<boolean>(false);
    const [value,setValue] = React.useState("")
    const theme = useTheme();
    const { t } = useTranslation();
    const {handleFilterProduct} = props


    const handleClickRadio = (e:any) => {
        const valueE = e.target.value;
        if(value === valueE){
            setValue("")
            handleFilterProduct("")
        } else {
            setValue(valueE)
            handleFilterProduct(valueE)
        }

    }


    return (
        <>
            {(isLoadingCheck) && <FallbackSpinner></FallbackSpinner>}
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{t("Rank")}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    onClick={handleClickRadio}
                    value={value}
                >
                    {FILTER_REVIEW_PRODUCT()?.map((item: any) => {
                        return <>
                            <FormControlLabel  value={item.value} control={<Radio />} label={item.label} />
                        </>
                    })}
                </RadioGroup>
            </FormControl>
        </>
    );
}


export default FilterProduct;