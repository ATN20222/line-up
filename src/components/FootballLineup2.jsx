import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './FootballLineup2.module.css';

const defaultPlayers = [
    { position: 'GK', x: '50%', y: '85%' },
    { position: 'CB1', x: '30%', y: '60%' },
    { position: 'CB2', x: '70%', y: '60%' },
    { position: 'CM', x: '50%', y: '40%' },
    { position: 'ST', x: '50%', y: '15%' },
    { position: 'Team Name', x: '6%', y: '-2%' },
];

const substitutePlayer = { position: 'SUB', x: '85%', y: '85%' };

const FilledFieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="#2b7a0b"/>
        <path d="M2 8H22" stroke="white" strokeWidth="1"/>
        <path d="M2 16H22" stroke="white" strokeWidth="1"/>
        <path d="M12 4V20" stroke="white" strokeWidth="1"/>
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1" fill="none"/>
        <rect x="2" y="6" width="4" height="12" fill="white" fillOpacity="0.3"/>
        <rect x="18" y="6" width="4" height="12" fill="white" fillOpacity="0.3"/>
    </svg>
);

const OutlinedFieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 8H22" stroke="currentColor" strokeWidth="1"/>
        <path d="M2 16H22" stroke="currentColor" strokeWidth="1"/>
        <path d="M12 4V20" stroke="currentColor" strokeWidth="1"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="2" y="6" width="4" height="12" stroke="currentColor" strokeWidth="1" fill="none"/>
        <rect x="18" y="6" width="4" height="12" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
);

export default function FootballLineup2() {
    const [players, setPlayers] = useState(
        defaultPlayers.map(p => ({ ...p, name: '', image: null }))
    );
    const [substitute, setSubstitute] = useState({ ...substitutePlayer, name: '', image: null });
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [playerImage, setPlayerImage] = useState(null);
    const [isSubstitute, setIsSubstitute] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const handleClick = (index, isSub = false) => {
        setSelectedPlayer(index);
        setIsSubstitute(isSub);
        if (isSub) {
            setPlayerName(substitute.name);
            setPlayerImage(substitute.image);
        } else {
            setPlayerName(players[index].name);
            setPlayerImage(players[index].image);
        }
        setShowModal(true);
    };

    const handleSave = () => {
        if (!playerName) return;

        if (isSubstitute) {
            setSubstitute({
                ...substitute,
                name: playerName,
                image: playerImage
            });
        } else {
            const updated = [...players];
            updated[selectedPlayer] = {
                ...updated[selectedPlayer],
                name: playerName,
                image: playerImage
            };
            setPlayers(updated);
        }
        setShowModal(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPlayerImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className={styles.layout}>
            <div className={`${styles.field} ${isDarkTheme ? styles.darkTheme : ''}`}>
                {players.map((player, i) => (
                    <div
                        key={i}
                        className={styles.player}
                        style={{ left: player.x, top: player.y }}
                        onClick={() => handleClick(i)}
                    >
                        {player.image ? (
                            <img src={player.image} alt={player.name} className={styles.image} />
                        ) : (
                            <div className={styles.placeholder}>+</div>
                        )}
                        <div className={styles.name}>{player.name || player.position}</div>
                    </div>
                ))}
                <div
                    className={`${styles.player} ${styles.substitute}`}
                    onClick={() => handleClick(0, true)}
                >
                    {substitute.image ? (
                        <img src={substitute.image} alt={substitute.name} className={styles.image} />
                    ) : (
                        <div className={styles.placeholder}>+</div>
                    )}
                    <div className={styles.name}>{substitute.name || 'Substitute'}</div>
                </div>
                <button 
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                >
                    {isDarkTheme ? <FilledFieldIcon /> : <OutlinedFieldIcon />}
                </button>
            </div>

            <div className={styles.sideMenu}>
                <h3>Team Lineup</h3>
                <div className={styles.playerList}>
                    {players.map((player, i) => (
                        <div key={i} className={styles.menuItem}>
                            <div className={styles.menuPlayer}>
                                {player.image ? (
                                    <img src={player.image} alt={player.name} className={styles.menuImage} />
                                ) : (
                                    <div className={styles.menuPlaceholder}>+</div>
                                )}
                                <span className={styles.menuName}>{player.name || player.position}</span>
                            </div>
                            <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleClick(i)}
                            >
                                Edit
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isSubstitute ? 'Edit Substitute' : 'Edit Player'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Player Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter player name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Player Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        {playerImage && (
                            <div className="text-center mb-3">
                                <img
                                    src={playerImage}
                                    alt="Preview"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
} 