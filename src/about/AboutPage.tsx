import React, { useState } from "react";
import "./AboutPage.css";
import AEImage from "../assets/AE.jpg";
import NMImage from "../assets/NM.jpg";
import ONImage from "../assets/ON.jpg";
import IBImage from "../assets/IB.jpg";

// Данные о членах команды
const teamMembers = [
  {
    name: "АE",
    role: "не придумал",
    description: "AE - талантливый разработчик и отличный собеседник.",
    image: AEImage,
  },
  {
    name: "NM",
    role: "просто чиловый парень",
    description: "NM - любитель котов, чилловой музыки и приятных разговоров.",
    image: NMImage,
  },
  {
    name: "ON",
    role: "не придумал",
    description: "ON - разработчик с глубокими знаниями и аналитическим подходом.",
    image: ONImage,
  },
  {
    name: "IB",
    role: "не придумал",
    description: "IB - креативный человек с нестандартным мышлением.",
    image: IBImage,
  },
];

const AboutPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<null | typeof teamMembers[0]>(null);

  const handleCardClick = (member: typeof teamMembers[0]) => {
    setSelectedMember(member); // Устанавливаем выбранного участника
  };

  const closeModal = () => {
    setSelectedMember(null); // Закрываем модальное окно
  };

  return (
    <div className="about-page">
      <p>О Нас</p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div
            className="team-card"
            key={index}
            onClick={() => handleCardClick(member)} // Открываем модальное окно
          >
            <img src={member.image} alt={member.name} className="team-image" />
            <h2>{member.name}</h2>
            <h3>{member.role}</h3>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedMember && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-body">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="modal-image"
              />
              <div className="modal-text">
                <h2>{selectedMember.name}</h2>
                <h3>{selectedMember.role}</h3>
                <p>{selectedMember.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
