import { Box, Typography } from "@mui/material";

type ContentNodeProps = {
    classIcon: string;
    titleInfo: string;
}

export function ContentNode({ classIcon, titleInfo }: ContentNodeProps) {
    return (
        <Box
            sx={{
                display:
                    'flex',
                flexDirection:
                    'column',
                justifyContent:
                    'center', alignItems:
                    'center'
            }}
        >
            <Typography
                sx={{
                    color:
                        '#009fd7',
                    fontSize:
                        '20px',
                    paddingBottom:
                        '3px'
                }}
                variant="inherit"
                component="i"
                className={`${classIcon}
              " icons-pipeline"`} />

            <Typography sx={{ fontSize: "8px" }} variant="inherit" component="span">{titleInfo}</Typography>
        </Box>
    )
}