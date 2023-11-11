import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MeetingTableData from "./MeetingTableData";

function MeetingTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="meeting-table">
                <TableHead>
                    <TableRow>
                        <TableCell width={100}></TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Teacher Score Weight</TableCell>
                        <TableCell>Student Score Weight</TableCell>
                    </TableRow>
                </TableHead>
                <MeetingTableData />
            </Table>
        </TableContainer>
    );
}

export default MeetingTable;