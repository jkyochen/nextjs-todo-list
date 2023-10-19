import { Container } from "@mui/material";

interface BodyProps {
    children: React.ReactNode
}

export default function Body({ children }: BodyProps) {
    return <Container maxWidth="sm" sx={{
        marginY: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }}>
        <h1>To-do List</h1>
        {children}
    </Container>
}
