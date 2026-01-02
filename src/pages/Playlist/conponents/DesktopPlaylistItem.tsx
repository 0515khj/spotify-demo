import type { Episode, PlaylistTrack, Track } from '../../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';

interface DesktopPlaylistItemProps{
    index:number;
    item:PlaylistTrack
}

export const Row = styled(TableRow)`

    cursor: pointer;
    &:hover {background: #666}

`

const DesktopPlaylistItem = ({item,index}:DesktopPlaylistItemProps) => {
    const isEplisode = (track:Track | Episode):track is Episode =>{
        return "description" in track
    }
    return (
        <Row>
            <TableCell>{index}</TableCell>
            <TableCell>{item.track.name||'no name'}</TableCell>
            <TableCell>{isEplisode(item.track)?"N/A" : item.track.album?.name}</TableCell>
            <TableCell>{item.added_at?.slice(0, 10) || "Unknown"}</TableCell>
            <TableCell>{item.track.duration_ms || "Unknown"}</TableCell>
        </Row>
    );
};

export default DesktopPlaylistItem;