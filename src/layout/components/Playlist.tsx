import { useNavigate } from "react-router";
import PlaylistItem from "../../common/components/PlaylistItem";
import type { SimplifiedPlaylist } from "../../models/playlist";

interface PlaylistProps {
  playlists: SimplifiedPlaylist[];
}

const Playlist = ({playlists}:PlaylistProps) => {

    const navigate = useNavigate();

    const _handleClick = (id:string) =>{
        navigate(`/playlist/${id}`)
    }
    return (
        <div>
            {playlists.map((item)=>(
                <PlaylistItem
                handleClick = {_handleClick}
                name={item.name || ""}
                image = {(item.images && item.images[0]?.url) || null}
                id = {item.id || ""}
                key = {item.id}
                artistName={item.owner?.display_name || ""} 
                />
            ))}
        </div>
    );
};

export default Playlist;