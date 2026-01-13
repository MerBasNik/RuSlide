import { useState, useEffect, useContext } from "react";
import classes from "./HomePage.module.css";
import presentationService from "../../../services/appwrite/presentation.ts";
import { useAppDispatch } from "../../hooks/useRedux.tsx";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/context.ts";
import {
    createPresentation,
    type Presentation,
} from "../../store/types/Presentation/Presentation.ts";
import { setPresentation } from "../../store/reducers/PresentationSlice.ts";
import authService from "../../../services/appwrite/auth.ts";
import Popup from "../../UI/Popup/Popup.tsx";
import { SlideThumbnail } from "../../UI/SlideThumbnail/SlideThumbnail.tsx";

const HomePage = () => {
    const { user, isAuth, setIsAuth, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [allPresentations, setAllPresentations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const { savePresentation, getPresentation, getAllPresentations } = presentationService();
    const { handleLogout } = authService();
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const loadPres = async () => {
            try {
                const presentations = await getAllPresentations();
                if (presentations) {
                    setAllPresentations(presentations.filter(p => p !== null));
                }
            } catch (error) {
                console.error("Failed to load presentations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadPres();
    }, [isAuth]);

    // const svgRef = useRef<SVGSVGElement>(null);
    // const handleSaveThumbnail = async () => {
    //     if (!svgRef.current) return;
    //
    //     try {
    //         const fileId = await saveSlideThumbnail(
    //             svgRef.current,
    //             `slide_${slide?.id || 'thumbnail'}`
    //         );
    //         console.log('Thumbnail saved with ID:', fileId);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleCreateNew = async () => {
        try {
            const newPresentation = createPresentation("Новая презентация");
            dispatch(setPresentation(newPresentation));
            await savePresentation(newPresentation);
            navigate("/ruslide/presentation");
        } catch (error) {
            setShowSavePopup(true);
            setError("Не удалось создать презентацию");
        }
    };

    const handleSelectPresentation = async (presentation: any) => {
        try {
            const loaded = await getPresentation(presentation.id);
            if (loaded) {
                dispatch(setPresentation(loaded));
                navigate("/ruslide/presentation");
            } else {
                setShowSavePopup(true);
                setError("Не удалось загрузить презентацию");
            }
        } catch (error) {
            setError("Ошибка при загрузке презентации");
            setShowSavePopup(true);
        }
    };

    if (isLoading) {
        return (
            <div className={classes.loadingContainer}>
                <div className={classes.spinner}></div>
                <p>Загрузка презентаций...</p>
            </div>
        );
    }

    const onLogout = async () => {
        try {
            await handleLogout();
            setIsAuth(false);
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className={classes.homePage}>
            <Popup isOpen={showSavePopup} onClose={() => setShowSavePopup(false)} content={error} />
            <header className={classes.header}>
                <h1 className={classes.title}>RuSlide</h1>
                <div className={classes.userinfo}>
                    <div className={classes.logoutBtn} onClick={() => onLogout()}>
                        <img className={classes.imageBtn} src="/images/logout.png" alt="Выйти" />
                    </div>
                    <p className={classes.username}>{user?.username}</p>
                </div>
            </header>
            <div className={classes.content}>
                <div className={classes.presentationsList}>
                    <div onClick={handleCreateNew} className={classes.presentationCard}>
                        <div className={classes.presentationThumb}></div>
                        <div className={classes.presentationInfo}>Создать пустую презентацию</div>
                    </div>
                    {allPresentations.map((pres: Presentation) =>
                        pres != null ? (
                            <div
                                key={pres.id}
                                className={classes.presentationCard}
                                onClick={() => handleSelectPresentation(pres)}
                            >
                                <SlideThumbnail
                                    slide={pres.slides[pres.slidesOrder[0]] || null}
                                    objects={pres.slides[pres.slidesOrder[0]]?.objects || {}}
                                    width={245}
                                    height={140}
                                    className={classes.presentationThumb}
                                />
                                <div className={classes.presentationInfo}>
                                    <p className={classes.presentationName}>{pres.name}</p>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
