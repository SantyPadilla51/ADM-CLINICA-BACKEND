import Turno from "../models/Turno.js";

const crearTurno = async (req, res) => {
  const turno = new Turno(req.body);

  turno.doctorId = req.doctor.id;

  try {
    const turnoGuardado = await turno.save();

    if (turnoGuardado) {
      res.status(200).json({
        ok: true,
        msg: "Turno Creado Correctamente",
      });
    } else {
      return res.status(403).json({
        ok: false,
        msg: "El turno no se pudo crear correctamente",
      });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
};

const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await Turno.findAll({ where: { doctorId: req.doctor.id } });

    res.json(turnos);
  } catch (error) {
    res.json({ ok: false, msg: "Hubo un error al obtener los turnos" });
  }
};

const editarTurno = async (req, res) => {
  const { id } = req.params;
  const { paciente, dia, mes, anio, min, hora, estado } = req.body;

  try {
    const turno = await Turno.findByPk(id);

    if (!turno) {
      return res.status(404).json({
        ok: false,
        msg: "Turno no encontrado",
      });
    }

    turno.paciente = paciente;
    turno.dia = dia;
    turno.mes = mes;
    turno.anio = anio;
    turno.hora = hora;
    turno.min = min;
    turno.estado = estado;

    await turno.save();

    res.status(200).json({
      ok: true,
      msg: "Turno actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al editar el turno",
      error: error.message,
    });
  }
};

const eliminarTurno = async (req, res) => {
  const { id } = req.params;

  try {
    const turno = await Turno.findOne({ where: { id } });

    if (!turno) {
      return res.status(404).json({
        ok: false,
        msg: "El turno que intenta eliminar no existe",
      });
    }

    await turno.destroy();

    return res
      .status(200)
      .json({ ok: true, msg: "Turno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Hubo un error al eliminar el turno" });
  }
};

export { crearTurno, obtenerTurnos, editarTurno, eliminarTurno };
