import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './FootballLineup.module.css';

const defaultPlayers = [
    { position: 'GK', x: '50%', y: '85%' },
    { position: 'CB1', x: '30%', y: '60%' },
    { position: 'CB2', x: '70%', y: '60%' },
    { position: 'CM', x: '50%', y: '40%' },
    { position: 'ST', x: '50%', y: '15%' },
];

const substitutePlayer = { position: 'SUB', x: '85%', y: '85%' };

export default function FootballLineup() {
    const [players, setPlayers] = useState(
        defaultPlayers.map(p => ({ ...p, name: '', image: null }))
    );
    const [substitute, setSubstitute] = useState({ ...substitutePlayer, name: '', image: null });
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [playerImage, setPlayerImage] = useState(null);
    const [isSubstitute, setIsSubstitute] = useState(false);

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

    return (
        <div className={styles.layout}>
            <div className={styles.field}>
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
