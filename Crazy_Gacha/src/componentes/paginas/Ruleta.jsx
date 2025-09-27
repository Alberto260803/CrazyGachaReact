
import Usuario from "../principal/Usuario.jsx";
import DisRuleta from "../ruleta/DisRuleta.jsx";


const Ruleta = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden box-border bg-gradient-to-br from-blue-100 to-blue-300 relative">
      {/* Usuario arriba izquierda */}
      <div className="absolute top-4 left-4 z-50">
        <Usuario />
      </div>
    {/* Contenido principal centrado */}
    <div className="flex-1 flex items-center justify-center">
        <DisRuleta />
    </div>
    </div>
  );
};

export default Ruleta;