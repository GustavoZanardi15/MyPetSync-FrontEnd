import {
  SERVICOS_POR_TIPO_PRESTADOR,
  STATUS_MAP,
  DURATION_MAP,
  STATUS_MAP_REVERSE,
} from "../appointmentConstants";

describe('appointmentConstants', () => {
    it('valida SERVICOS_POR_TIPO_PRESTADOR', () => {
        expect(SERVICOS_POR_TIPO_PRESTADOR["Pet Sistter"]).toEqual([
            "Cuidados Domiciliares",
            "Passeio",
        ]);

        expect(SERVICOS_POR_TIPO_PRESTADOR["Veterinário Autônomo"]).toContain(
            "Consulta"
        );

        expect(SERVICOS_POR_TIPO_PRESTADOR["Pet Shop"]).toEqual([
            "Banho",
            "Tosa",
            "Banho e Tosa",
        ]);
    });

    it("valida STATUS_MAP", () => {
        expect(STATUS_MAP.Agendado).toBe("scheduled");
        expect(STATUS_MAP.Confirmado).toBe("confirmed");
        expect(STATUS_MAP.Concluído).toBe("completed");
    });

    it("valida DURATION_MAP", () => {
        expect(DURATION_MAP["30 min"]).toBe(30);
        expect(DURATION_MAP["60 min"]).toBe(60);
        expect(DURATION_MAP["90 min"]).toBe(90);
    });

    it("valida STATUS_MAP_REVERSE", () => {
        expect(STATUS_MAP_REVERSE.scheduled).toBe("Agendado");
        expect(STATUS_MAP_REVERSE.confirmed).toBe("Confirmado");
        expect(STATUS_MAP_REVERSE.completed).toBe("Concluído");
        expect(STATUS_MAP_REVERSE.canceled).toBe("Cancelado");
    });
});