
//Mui Import
import { TextFieldProps, TextField, styled } from "@mui/material";



//Theme Chính là useTheme() để lấy giá trị thay vì dùng hooks ta dùng theme
const TextFieldStyled = styled(TextField)<TextFieldProps>(({ theme }) => {
    return {
        width: "100%", //.MuiFormControl-root .MuiTextField-root

        ".MuiInputLabel-root": {
            transform: "none",
            lineHeight: 1.2,
            position: "relative",
            marginBottom: theme.spacing(1),
            fontSize: theme.typography.body2.fontSize
        },
        ".MuiInputBase-root": {
            borderRadius: 8,
            width: "100%",
            backgroundColor: "transparent",
            border: `1px solid rgb(${theme.palette.customColors.main},0.2)`,
            transition: theme.transitions.create(["border-color", "box-shadow"], {
                duration: theme.transitions.duration.shorter,
            },),
            // "&:after":{
            //     display:"none"
            // },
            "&:before": {
                display: "none"
            },
            ".MuiInputBase-input": {
                padding: "12px 16px",
                width: "100%",
            },
        },
        ".MuiFormHelperText-root": {
            marginLeft: 0
        },

    }

})

const CustomTextField = (props: TextFieldProps) => {
    const { size = "small", variant = "filled" ,InputLabelProps, ...rests } = props;
    return (
        <TextFieldStyled size={size} variant={variant} InputLabelProps={{ ...InputLabelProps, shrink: true }}{...rests}></TextFieldStyled>
    )
}


export default CustomTextField;