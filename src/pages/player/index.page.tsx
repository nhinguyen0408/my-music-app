import { FC, Fragment, useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";
import apiClient from "../../spotify.config";

export interface PlayerProps {}

const PlayerPage: FC<PlayerProps> = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState<any>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log('location', location);
    
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res: any) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}

export default PlayerPage