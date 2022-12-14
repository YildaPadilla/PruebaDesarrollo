USE [TarjetaDB]
GO
/****** Object:  Table [dbo].[Tarjeta]    Script Date: 4/11/2022 4:35:29 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tarjeta](
	[idTarjeta] [int] IDENTITY(1,1) NOT NULL,
	[nummeroTarjeta] [varchar](max) NULL,
	[fechaVencimiento] [varchar](max) NULL,
	[nombreTitular] [varchar](max) NULL,
	[cvv] [varchar](max) NULL,
 CONSTRAINT [PK_Tarjeta] PRIMARY KEY CLUSTERED 
(
	[idTarjeta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
