import { Skeleton } from "@mui/material";

function LoadingContentItem() {
    return (<div>
        <Skeleton variant="rounded" width={"100%"} height={150} />
        <div style={{ display: "flex", flexDirection: "row", gap: "15px", marginTop: "10px" }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={"60%"} />
        </div>
        <Skeleton variant="text" width={"70%"} height={35} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
            <Skeleton variant="rounded" width={70}></Skeleton>
            <Skeleton variant="rounded" width={70}></Skeleton>
        </div>
    </div>)
}

export default LoadingContentItem;