import { alpha, Box, Button, IconButton, InputBase, Modal, ModalProps, styled, Tooltip, Typography } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";
import useDebounce from "src/hooks/useDebounce";




interface TProps {
    value: string,
    onChange: (value: string) => void
}


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    borderRadius: "7px",
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));



export const InputSearch: NextPage<TProps> = ({ value, onChange }) => {

    const { t } = useTranslation();

    const [search, setSearch] = useState(value);
    const debounceSearch = useDebounce(search,300);

    useEffect(() => {
        onChange(debounceSearch)
    },[debounceSearch])

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <IconifyIcon icon={"material-symbols:search"}></IconifyIcon>
                </SearchIconWrapper>
                <StyledInputBase
                    value={search}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </Search>
        </>
    )
}

export default InputSearch;