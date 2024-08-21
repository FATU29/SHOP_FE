import { BorderColor } from "@mui/icons-material";
import { Box, FormControl, InputLabelProps } from "@mui/material";
import { InputLabel, MenuItem, Select, SelectProps, styled } from "@mui/material";
import { NextPage } from "next";

// Use type instead of interface
type TCustomSelect = SelectProps & {
    options: { label: string; value: string }[];
    content: string
};


const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    width: "100%",
    "&.MuiInputBase-root.MuiOutlinedInput-root": {
        padding: "12px 10px 10px 12px",
        height: "40px",
        boxSizing: "border-box",
        position: "relative",
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
        display: "none !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: "rgba(47, 43, 61, 0.3)",
    }
}));



const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    // Add your custom styles here
}));

const StyledInputLabel = styled(InputLabel)<InputLabelProps>(({ theme }) => {
    return {
        "&.MuiFormLabel-root.MuiInputLabel-root": {
            display:"block",
            marginBottom:"6px",
            fontSize:"14px"
        },

    }
})


const CustomSelect: NextPage<TCustomSelect> = ({ value, label, onChange, options, fullWidth, content, ...rest }) => {
    return (
        <>
            <Box>
                <StyledInputLabel>{content}</StyledInputLabel>
                <StyledSelect
                    fullWidth={fullWidth}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value}
                    onChange={onChange}
                    label={label}
                    {...rest}
                >

                    { options.length > 0 ??
                        options?.map((opt) => {
                            return (
                                <>
                                    <StyledMenuItem key={opt.value} value={opt.value}>{opt.label}</StyledMenuItem>
                                </>
                            )
                        })
                    }
                </StyledSelect>

            </Box>
        </>
    );
};

export default CustomSelect;
