import { alpha, InputBase, styled, useTheme } from "@mui/material";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import IconifyIcon from "../Icon";
import useDebounce from "src/hooks/useDebounce";

interface TProps {
    value: string;
    onChange: (value: string) => void;
}

const Search = styled("div")(({ theme }) => {
    const backgroundColor = theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : alpha(theme.palette.common.white, 0.15);

    return {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: backgroundColor,
        "&:hover": {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.grey[400]
                    : alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: 0,
            width: "auto",
        },
    };
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    borderRadius: "7px",
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export const InputSearch: NextPage<TProps> = ({ value, onChange }) => {
    const [search, setSearch] = useState(value);
    const debounceSearch = useDebounce(search, 500);

    useEffect(() => {
        onChange(debounceSearch);
    }, [debounceSearch]);

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <IconifyIcon icon={"material-symbols:search"} />
                </SearchIconWrapper>
                <StyledInputBase
                    value={search}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </Search>
        </>
    );
};

export default InputSearch;
