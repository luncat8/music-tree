// owns: Afro-Cuban lineage records and their reference slugs
// edit for: Afro-Cuban catalogue entries, studies and instruments
const afrocubanLineage = [
	{
		file: 35, id: 'son', name: 'Son cubano', wiki: 'Son_cubano', parent: null, family: 'son', date: 'Late 1800s', place: 'Eastern Cuba',
		influences: [],
		shift: 'Cuban son combined Spanish-derived song and string traditions with Afro-Cuban rhythmic practices. The tres repeats short figures against syncopated bass and percussion.',
		core: ['Tres', 'Bongos', 'Claves'], optional: ['Trumpet', 'Voice'], techniques: ['Son clave', 'Call and response'], traits: ['Syncopated', 'Dance music'],
		landmark: { title: 'Échale salsita', artist: 'Septeto Nacional', year: '1930', note: 'Hear the response to the lead vocal.' },
		study: { title: 'El cuarto de Tula', artist: 'Buena Vista Social Club', year: '1997', note: 'Follow the recurring backing pattern under the changing vocals.' }
	},
	{
		file: 36, id: 'salsa', name: 'Salsa', wiki: 'Salsa_music', parent: 'son', family: 'son', date: '1960s–70s', place: 'New York City and the Caribbean',
		influences: [['mambo', 'Mambo orchestras contributed arranged horn riffs and dance-band energy to the salsa repertoire.']],
		shift: 'Salsa musicians built on Cuban son and other Caribbean styles, using repeating piano figures, strong percussion and brass responses in arrangements for dancers.',
		core: ['Piano', 'Congas', 'Horns'], optional: ['Claves', 'Bongos', 'Voice'], techniques: ['Piano montuno', 'Brass riffs'], traits: ['Dance music', 'Syncopated'],
		landmark: { title: 'Quimbara', artist: 'Celia Cruz and Johnny Pacheco', year: '1974', note: 'Hear the horns and chorus answer the lead.' },
		study: { title: 'Pedro Navaja', artist: 'Rubén Blades and Willie Colón', year: '1978', note: 'Track how new layers enter beneath the story.' }
	},
	{
		file: 41, id: 'danzon', name: 'Danzón', aliases: ['danzon'], wiki: 'Danz%C3%B3n', parent: null, influences: [], family: 'son', date: 'Late 1800s', place: 'Matanzas, Cuba',
		shift: 'Danzón developed from Cuban contradanza as a composed ballroom dance. Later charanga ensembles set flute and violins against piano, bass and percussion, alternating measured themes with livelier sections.',
		core: ['Flute', 'Violin', 'Timbales'], optional: ['Piano', 'Upright bass', 'Güiro'], techniques: ['Contrasting sections', 'Cinquillo rhythm', 'Orchestral melody'], traits: ['Ballroom', 'Charanga'],
		landmark: { title: 'Las alturas de Simpson', artist: 'Orquesta Almendra', year: '1957', note: 'Follow the contrasting sections of this interpretation of Miguel Faílde’s early danzón.' },
		study: { title: 'Almendra', artist: 'Orquesta Almendra', year: '1957', note: 'Listen for the melody passing between flute and strings over the steady dance pulse.' }
	},
	{
		file: 42, id: 'mambo', name: 'Mambo', wiki: 'Mambo_(music)', parent: 'danzon', family: 'son', date: '1930s–40s', place: 'Cuba and Mexico',
		influences: [['son', 'Son’s syncopated montuno helped shape the lively closing sections of danzón-mambo.'], ['jazz', 'Jazz big-band arranging helped shape the brass and reed sound of later mambo orchestras.']],
		shift: 'Mambo grew from the nuevo ritmo of danzón orchestras including Arcaño y sus Maravillas. Later big bands, notably Pérez Prado’s, expanded its syncopated riffs and percussion into an international dance sound.',
		core: ['Piano', 'Timbales', 'Brass'], optional: ['Saxophones', 'Congas', 'Upright bass'], techniques: ['Syncopated riffs', 'Montuno', 'Section responses'], traits: ['Dance music', 'Orchestral'],
		landmark: { title: 'Mambo No. 5', wiki: 'Mambo_No._5', artist: 'Pérez Prado', artistWiki: 'P%C3%A9rez_Prado', year: '1949', note: 'Hear brass and reeds trade clipped, syncopated figures over the percussion.' },
		study: { title: 'Qué rico el mambo', artist: 'Pérez Prado', artistWiki: 'P%C3%A9rez_Prado', year: '1949', note: 'Tap the underlying pulse and repeat a short horn riff without rushing the offbeats.' }
	},
	{
		file: 43, id: 'chachacha', name: 'Cha-cha-chá', aliases: ['cha cha cha', 'cha-cha-cha', 'chachacha', 'cha cha'], wiki: 'Cha-cha-ch%C3%A1', parent: 'danzon', family: 'son', date: 'Early 1950s', place: 'Havana, Cuba',
		influences: [['mambo', 'Jorrín’s dance music developed from danzón-mambo, with melodies intended to be easier for dancers to follow.']],
		shift: 'Violinist Enrique Jorrín and Orquesta América developed cha-cha-chá from the danzón tradition. Its clear melodies and characteristic triple-step feel gave dancers a different way to move to the charanga sound.',
		core: ['Violin', 'Flute', 'Güiro'], optional: ['Piano', 'Timbales', 'Voice', 'Upright bass'], techniques: ['Triple-step feel', 'Unison vocals', 'Charanga melody'], traits: ['Dance music', 'Charanga'],
		landmark: { title: 'La engañadora', wiki: 'La_enga%C3%B1adora', artist: 'Orquesta América', artistWiki: 'Orquesta_Am%C3%A9rica', year: '1953', note: 'Hear the unison voices and the bright flute and violin in Jorrín’s early hit.' },
		study: { title: 'Silver Star', artist: 'Orquesta América', artistWiki: 'Orquesta_Am%C3%A9rica', year: '1953', note: 'Keep a steady dance pulse while following the short melodic phrases.' }
	}
];

if (typeof module !== 'undefined' && module.exports) module.exports = afrocubanLineage;
