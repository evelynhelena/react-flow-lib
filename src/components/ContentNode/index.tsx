import { Box, IconButton, Typography } from "@mui/material";
import { useContentReactFlow } from "../../hooks/useContentReactFlow";

type ContentNodeProps = {
    classIcon: string;
    titleInfo: string;
    id: string;
}

export function ContentNode({ classIcon, titleInfo, id }: ContentNodeProps) {
    const { deleteNodeButton } = useContentReactFlow();
    return (
        <>
            <IconButton
                aria-label="delete"
                sx={{
                    position:
                        'absolute',
                    top:
                        1,
                    right:
                        2,
                    padding:
                        "5px"
                }}
                onClick={() => deleteNodeButton(id)}
            >
                <Typography
                    sx={{
                        fontSize:
                            "10px",
                        color:
                            "#0B1641",
                        ":hover": {
                            color: "#009fd7",
                        }
                    }}
                    variant="inherit"
                    component="i"
                    className="ri-close-circle-fill"

                />
            </IconButton>
            <Box
                sx={{
                    display:
                        'flex',
                    flexDirection:
                        'column',
                    justifyContent:
                        'center',
                    alignItems:
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

                <Typography sx={{ fontSize: "8px", color: "#0B1641", }} variant="inherit" component="span">{titleInfo}</Typography>
            </Box>
        </>
    )
}