export interface GetNormaResponse {
	id: string;
	codigo: string;
	titulo: string;
	escopo: string;
	area_tecnica: string;
	orgao_emissor: string;
	versoes: {
		data_publicacao: Date;
		status: boolean;
	}[];
}
