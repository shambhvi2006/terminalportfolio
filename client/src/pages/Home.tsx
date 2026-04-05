import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ASCII_ART = `....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:+??????%%%???%%%%%%%%
........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:+*?????%%%?%%%%%%%%
...,.........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,;*??????%%%%%%%%%
..,................,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,;+?????%%%%%%%%
,,.....,....,...........,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:+*?????%%%%%
,,,,,,,.....,..............,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,:;*????%%%%
...,..,,..,,,..................,,,,,,,.,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,:+???%%?
:,,,,,,::,,,...,..,..........,....,,..,,,....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,.,+****?
++:,.,::;:,,,,,,,,,..,,,......,,,.,,.,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,+++++*
;++;:,:,,:::::::,,,,,,,,,,.....,,:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,++++++
;+:;;;::::::::::,,:::,,,,,,,,,,::,,,::::,,,,,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,++++++
++;++?;::::;;:;;;:;:::;:::;,;;:,,,,,:,:,,.,,....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,++++++
+++++*:;::;;;;;;+;;;:;;:+::,;;,,::;:::,,,,,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,++++++
**;;++:;:;:,::;+?;+;;:::::::*;:;;+;;:::::.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,++++++
?;:;+;:::;:::::;;;;+;::::::,*;+**;;;;,++;,:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,++;;;;
?;;+:::;;+;;:::;,:;::,:+++;:*;*?**??+;;+;;:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,++;;;;
;?+::;+?+;:;;:,;;:::;++****??*%%??%???**;+;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:++;;;;
:+*;:++;::::+;:+:::;;**????%%???%???*???**;;:,,,,,,,,,,,,,,,,,,,,,,,,,,:,,:,,:,,,,,:::,:+;;;;;
,:?*+:,,,:;:+++*+;+**+*?????%?*???**??????**+;+;,,,,.,,,,,,,,,,,,,,,,,,,,::::+++::;,,,:,,:;+;;;;;;;;
;*++*::::::;**+**;;++*???%?%%%???*??????**??????++:;;:::,,,,,,,,,,,,,;;,,,:;;;++;:;:;;;+;;+++;;;;;;;
*;:::+?*++****?**++++?*????%%?*?????*??????**?****???*++;;;,,,,;;,,:+*+,,:;****??*?*****?**;;,;;;;;;
*++;++**?+++;?*;;:+**??????%??????????????????****????*****++;;;?:;*???*;**??????%%??***???**;;;;;;;
+;;:;;*+????%%++**????%%%%?%%?%%%?*?%???????%%?**???????*?***??***????*???%???%%%????%%%??*??;;;;;;;
::::::;*S?**???**??????????%????%????%???????????????*????%???????????????%???%?%%%%%%%%%?+*+;;;;;;;
::::;+;*?***++***%???%%%??%%????%??%%%%????????????*??%?%%%%%%????%?%?%%%%%%%%%%%%%%%%S%%%%??*::;:;;
:;:;;+*++**+???*??????%%%?%%?%%%%%%%S%%%??????%%%?***?%%?%%%%%%%%%%?%%%%?%%%%%%%SSSS%%SSSS%%%?::::;;
++;;;;??*???%?%S%???%%%%%%??%%%%SS%%S%%%%?%?%%%%%%%????????%%%%SS%??????%?%SSSS%%SSS%%%%%????+:::::;
****++*???*%?%%%%?%%%%%%%%%%%S%%%%S%%%%%%%%%%%%%%%%%?????????%%S%%%%%%?+;;;;;+;;;:;;;:::::::::;;:::;
****?**?*?%??%%%%%%%%%SS%?%%???%%%%S%%%%%S%%%?%%%%S%?%%??*???%S%%%%%?%?:,,,,,;:::::::::::::::::;;:::
***???%????%%%%%%%%S%SSS%??%???%%%%%%%%%%%%%%%??%?%%%%????*?*?????????%:,,,::;:::::::::::::::::;;:::
?*?*??????%%%?%%%%%%?%%S%?%%??%%%%SSS%%%SS%S%%????%%??????%%???%%SSSS##S;,,,:;::::::::::::::::::::::
?????%%%SSS%%%SSS%%%%%SSS%%?%%?%%%%%%%%%SS%S%%S?%%?*?**?%%SSSS?%*;+*?%S@@?:,::::::::::::::::::::::::
????%%%SSS%?%SS%%%%%%%SSSS%??%%%%?%%%S%SSSSSS%%%%SSSS???%%SSSSS?;;+*SSS%#@%:::::::::::::::::::::::::
???%%%SSSS?%%??**????S%SS%S%%%%%????%%%%%%%%?????%%%%%%%%%%%%%##*%S*?%??%S@%+:,:::::::::::::::::::::
???????%%??%????*???%%%%%%%%%%%%%%%?%%%%%%%%%%??%%%SS%%%SSSSS%#@%*+**%S%%S@@S+::::::::::::::::::::::
%?%%?%%%%?%%?%%%?%S%SS##SSSSSSSSSS%%%SSSS%%S%?%%%%?%%%SS%%SSSS#@#?*???%%S#@@@%;:::::::::::::::::::::
%%%??%%%?%%SSSS%?%SSSSSS#SSSSSSSSS%%SSSSSS%%S%%%%%%SS%%%%%?SS%#@@#S%??%S##@@@@%*;::,,,::::::::::::::
%%%??%%%%%%SSSS%%%SSSSSS#SSSSSS%S%%%%S%%%%%%SS%%%%SSSSSS##SS%?S@@@@@#?%%SS#@@@@##S%++:,:::::::::::::
%%S%?%%S??%%%%%???%%%%?%????%?%%SSSSSSSSSS%%SS%S?%%%%%%SS##S%%S##@@@@S%%?%##@@@@@@S?%%;,::::::::::::
*?%%?%%%??%%%????%%%S?*%?*%?S??%S#SSSSSSSS%S%%SSSSSSS%%%%%%%%*;;##########@@@@@@@@#%%%%;::::::::::::
*?%%%%%??%%?S%??%%SSS???*?%?S%?%?%S#S?%%%%%SSSSS%?%%SSS%SSSS+::;S########@@@@@@@@@@SS%%*::::::::::::
??%SS%%%??%%SSS%%%SSSSS????*%??*;*SSSSS%%%SS%%%S*+++?%%*?SS?:;+;S###########@@@@@@@SS%%%;:::::::::::
??%%**????????????%%%%%%%%%SS%S%??SSSSSS%S%S%%*S%*???%%SSSS;;*?*#############@@@@@@##S%%*:::::::::::
*?%***?*??***********************?%%%SSSSS%%%%%SS%SSSS%S##*:+*%S#SS#########@@@@@@@@#S%%?:::::::::::
?%?++*?*??******************?????????SSSSS%%******??*??%S?:+*?S#SS#####@@@@@@@@@@@@S%#S%%:::,,::::::
%%?***?*??****??*************??%S%????%SSS%?%???**?%*?%S?:;*?%SSS###@@@@@@@@@@@@@@@?*SSSS+,,,,::::::
******?*?%?*****???***?******??%S??????SSS%?%%%%??%%%%%*:;+?SS%%S##@@@@@@@@@@@@@@@S*:%##S*,,,,::,,::
********??*****???***%?***????%S%??????%SS??%%SS%??%%*;:;*?SS%%S###@@@@@@@@@@@@@@@?*;*SSS*,:;::::,,,
**?*****?**?????%%???%?**?%%%%%%%%?????%S%???%SS%%?*;:;+*%S%%%S######@@@@@@@@@@@@%:;+?SS%+:;++;;;;;;
???*****???%?%?%????%%%???*+*%%%SSS??????%%SS%???S%?+;:;*?%?????*S######@@@@@@@@@@@@;::;%%%?,,::::::::;
%%??????%????%%%%%%%%?%?*??%%SS%%??*?%%%S%%%%?*+;++*??????%%SS%###@@@@@@@@@@@@@@@::,;%%%;,,,,:::::::
SS%%%%%?S?%%%%%%%%S%??*??*?%SSS%%%?**????*??*+**??%%SS%%SSS%##?%###@@@@@@@@@@@@@#+,:+?%+,,,,,,,:::::
*?%*????%?%%%%S%%?****???*????%???????**+;;;;?%%%%%SS%%%SSSS#SS#S%%###@@@@@@@@##@#::*??:,,::::::::::
??%??%?*%%?*?%#???******???**???*++++*%S?*+*%%%%??%SS%%%SSSS#SS@@###S#S#S#####@@@@++?%;,::::::::::::
++%**??+%S?+*%%????%??????**++**?%S###S%?%S%S#S%%?*%S???%?%%#S#@@@@@@@@@@@@@@@@@@???%*,,,,,:::::::::
;;%*****?????%%%%%%?*****??%S##SS%??%S%%%%SSS#S%%%??S**??**?#S##@@@@@@@@@@@@@@@@#?%%?,,,,,::::::::::
?**???%%?%%%??**+**?%%S#####%?*****+%#%%S%%%SS%%%%%%%+;:::+*#S##@@@@@@@@@@@@@@@@SSS*::::::::::::::::
*???***+++++**%SS####SS%S%S#S?******%S*???%%SS??*+;;?,.,,,,;#S##@@@@@@@@@@@@@@@@@@%;;:::::::::::::::
*??**+*?%S####SS#S%S%%SSS%S#S%%*****%%*****+%%:,,..,;,,,,,,:SSS@@@@@@@@@@@@@@@@@@S+;;;;:::::::::::::
*?%S####S%%??**%#SSSSSSSS%S#S%%%?****%*++;:,:*.,,,,,,,,,:;+*SS#@@@@@@@@@@@@@@@@@@*;+;;;;;:::::::::::
####SS???+++++?S#SS%SSS%SS%#SSSS?**+++,,,,,,:;,,,,,,:;******%##@@@@@@@@@@#@@@@@@#++++;;;;;;:::::::::
%S##%%%?%?*+++*%#SSSSS%SS%%%S??+;:,,:+,,,,,,,,,,:;**??********%S###@##@@@@@@@@@@%++++++;;;;;;;;:::::
SS##SSS%%%?*+++*#?**?**?S?+;+,,,,,,,,:,,,,,,:;+*??*************+*??%SS???%%S##@#**++++++;;;;;;;;;:::
#%%###SS%%%%?++?#****+;::,.;:,,,,,,,,,,,:;+**??***********************??%*:,:;+**??%?%%?*+++++;;;;;;;;;;
%%S##SS#SS%?**+?#+;:,,,,,,,::,,,,,,,:;+**??***********************??%;::;+**??%S##SS#S?+++++;;;;;;;;
%SS##SSSS?*+*+:+S,,,,,,,,,,,,,,,:;+*???************?**************??*:::+**???%SSSSSSS%**+++++;;;;;;
S%S#S?*++;:,,,.;*,,,,,,,,,,,:;+*????*************????????????????**?+::;+*???%SS######S%??***++++;;;
%+%#?:,,,,,,,,,:::,,,,,,:;+*??????*?************??????????????????**;;;+*???%###SS####S%%%%%%???**++
;::?+.,,,,,,,,,,,,,,:;+*??????????***********?????????????????%%%?+*+;;+?%%%#####%S###%????%%%%%%%%%
,,,++,::,,,,,,,::;+*?????*?????????******?????????????????%%%%%%%%**++*?%%%%SSSSSS####%%%%????????%?
,,:::::,,,,,:;+*??????**??????????????????????????????%%%%%%%%####?*++?%%%?%##########S%%???????***+
,,,:,,,,:;+*???????????????????????????????????????%%%%%%%S%%S#SSS%?*+*?%%?%##########S%?****??****+
,,,,:;+*??????**????????????????????????????????%%%%%%SSSS%%SSS%SSS?*+**???%#####SSS%%%??*****??*+++`;

const PORTFOLIO_DATA = {
  name: 'Shambhvi Sharma',
  title: 'Computer Engineering Student',
  bio: 'Software-focused computer engineering student with experience building backend systems, data pipelines, and full-stack applications.',
  about: `I am a software-focused computer engineering student with experience building backend systems, data pipelines, and full-stack applications. I work primarily with the MERN stack and have a strong foundation in data structures and problem solving.

My work emphasizes clean system design, efficient data handling, and building applications that are practical, scalable, and production-oriented. I am currently expanding my expertise in machine learning and real-world system integration.

I aim to grow into a highly capable software engineer with strong problem-solving skills and impactful projects.`,
  
  skills: {
    languages: ['C++', 'Python', 'JavaScript'],
    webDev: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API Design'],
    cs: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Operating Systems (fundamentals)'],
    ml: ['NumPy', 'Pandas', 'Model fundamentals (ongoing)'],
    tools: ['Git & GitHub', 'Postman', 'VS Code']
  },
  
  projects: [
    {
      name: 'NeuroVoice - AI-based Parkinson\'s Monitoring Platform',
      description: '• Built a backend-driven health monitoring platform combining voice and facial motor analysis for early Parkinson\'s screening.\n• Designed an end-to-end speech and facial feature pipeline extracting 30+ acoustic features and trained predictive models achieving 85% ROC-AUC.\n• Developed scalable backend inference services processing multimodal inputs with 500 ms latency supporting 1000+ patient assessments.',
      github: 'https://github.com/NeuroVoice-MIC',
      video: 'https://youtu.be/IWkQf1ABPcc'
    },
    {
      name: 'Rehabify - AI-powered Physiotherapy Platform',
      description: '• Built a full-stack physiotherapy platform integrating React frontend, backend APIs, and AI motion analysis services.\n• Implemented MediaPipe-based motion tracking pipelines processing 33 body landmarks for posture monitoring and rehabilitation feedback.\n• Developed backend algorithms for rep counting and posture validation achieving 90%+ movement detection accuracy.',
      github: 'https://github.com/Rehabify-GamifiedPhysiotherapy',
      video: 'https://www.youtube.com/watch?v=O-FSrsMiRIg'
    },
    {
      name: 'Financio - Financial Analysis Platform',
      description: '• Developed a financial data pipeline to analyze dividend events and market trends.\n• Transitioned system logic from ex-date to announcement-date alignment for accurate financial metrics.\n• Computed next-day returns and structured financial data for comprehensive analysis.',
      github: null,
      video: 'https://youtu.be/NkvrBciumgo'
    },
    {
      name: 'Civic.AI - Civic Grievance Intelligence Platform',
      description: '• Built a backend-driven civic complaint intelligence system aggregating and analyzing 1000+ public grievance records.\n• Designed RESTful APIs using Node.js and Express for complaint ingestion, categorization, and analytics pipelines.\n• Implemented NLP-based classification and geospatial clustering to detect complaint hotspots with 200 ms API response time.',
      github: 'https://github.com/CIVIC-AI-PROJECT',
      video: 'https://drive.google.com/file/d/1289dDKvdeC0o6hqQRD7HkenImL4fTqRP/view?usp=drivesdk'
    }
  ],

  contact: {
    email: 'shambhvi.sharma@gmail.com',
    github: 'https://github.com/shambhvi2006',
    leetcode: 'https://leetcode.com/u/shambhvi2006/',
    linkedin: 'https://www.linkedin.com/in/shambhvi-sharma-9514b6324'
  }
};

type Section = 'home' | 'about' | 'skills' | 'projects' | 'resume' | 'contact' | 'help' | 'fun';

export default function Home() {
  const [, setLocation] = useLocation();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [inputValue, setInputValue] = useState('');

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed) {
      if (trimmed === 'help') {
        setCurrentSection('help');
      } else if (trimmed === 'about') {
        setCurrentSection('about');
      } else if (trimmed === 'skills') {
        setCurrentSection('skills');
      } else if (trimmed === 'projects') {
        setCurrentSection('projects');
      } else if (trimmed === 'resume') {
        setCurrentSection('resume');
      } else if (trimmed === 'contact') {
        setCurrentSection('contact');
      }
      setInputValue('');
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'help':
        return (
          <div className="text-pink-400 font-mono text-xs sm:text-sm">
            <div>Available commands:</div>
            <div className="mt-2 ml-3 sm:ml-4 space-y-1">
              <div>about      → Professional summary</div>
              <div>skills     → Technical expertise</div>
              <div>projects   → Selected work</div>
              <div>resume     → Experience & education</div>
              <div>contact    → Contact information</div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="text-pink-400 font-mono text-xs sm:text-sm space-y-3">
            <div className="font-bold text-pink-300">{PORTFOLIO_DATA.name}</div>
            <div>{PORTFOLIO_DATA.title}</div>
            <div className="mt-3 whitespace-pre-wrap text-xs leading-relaxed">
              {PORTFOLIO_DATA.about}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="text-pink-400 font-mono text-xs sm:text-sm space-y-3">
            <div className="font-bold text-pink-300">Languages:</div>
            <div className="ml-3 sm:ml-4">{PORTFOLIO_DATA.skills.languages.join(', ')}</div>

            <div className="font-bold text-pink-300 mt-3">Web Development:</div>
            <div className="ml-3 sm:ml-4">{PORTFOLIO_DATA.skills.webDev.join(', ')}</div>

            <div className="font-bold text-pink-300 mt-3">Core Computer Science:</div>
            <div className="ml-3 sm:ml-4">{PORTFOLIO_DATA.skills.cs.join(', ')}</div>

            <div className="font-bold text-pink-300 mt-3">Machine Learning:</div>
            <div className="ml-3 sm:ml-4">{PORTFOLIO_DATA.skills.ml.join(', ')}</div>

            <div className="font-bold text-pink-300 mt-3">Tools & Workflow:</div>
            <div className="ml-3 sm:ml-4">{PORTFOLIO_DATA.skills.tools.join(', ')}</div>
          </div>
        );

      case 'projects':
        return (
          <div className="text-pink-400 font-mono text-sm space-y-4 sm:space-y-6">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <div key={idx} className="bg-gradient-to-r from-pink-400/10 to-pink-300/5 border-2 border-pink-400 rounded-lg p-3 sm:p-4 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300">
                <div className="font-bold text-pink-200 text-sm sm:text-base mb-2">{project.name}</div>
                <div className="text-pink-300 text-xs whitespace-pre-wrap mb-3 sm:mb-4 leading-relaxed">{project.description}</div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {/* GitHub Link */}
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 sm:px-3 py-1 border border-pink-400 rounded text-pink-300 hover:bg-pink-400 hover:text-black transition-all duration-300 text-xs font-mono min-h-[40px] flex items-center justify-center"
                    >
                      → GitHub
                    </a>
                  )}
                  
                  {/* Video Link */}
                  {project.video && (
                    <button
                      onClick={() => window.open(project.video, '_blank')}
                      className="px-2 sm:px-3 py-1 border border-pink-400 rounded text-pink-300 hover:bg-pink-400 hover:text-black transition-all duration-300 text-xs font-mono min-h-[40px] flex items-center justify-center"
                    >
                      → Watch Video
                    </button>
                  )}
                </div>
                
                {/* Embedded Video - Only for YouTube videos, not Google Drive */}
                {project.video && !project.video.includes('drive.google.com') && (
                  <div className="mt-3 sm:mt-4">
                    <div className="w-full aspect-video bg-black rounded border-2 border-pink-400/50 overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={project.video.replace('youtu.be/', 'youtube.com/embed/').replace('watch?v=', 'embed/')}
                        title={project.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'resume':
        return (
          <div className="text-pink-400 font-mono text-xs sm:text-sm space-y-3">
            <div className="font-bold text-pink-300">Experience:</div>
            <div className="ml-3 sm:ml-4">
              <div className="font-bold text-sm sm:text-base">Quantitative AI Intern — CiteSert (Remote)</div>
              <div className="text-xs">Dec 2025 – Present</div>
              <div className="text-xs mt-2">• Built and refined financial data pipelines</div>
              <div className="text-xs">• Implemented dividend-based analytical models</div>
              <div className="text-xs">• Focused on producing clean, reliable, and structured outputs</div>
            </div>

            <div className="font-bold text-pink-300 mt-4">Education:</div>
            <div className="ml-3 sm:ml-4">
              <div className="font-bold text-sm sm:text-base">B.Tech in Computer Engineering (Second Year)</div>
              <div className="text-xs mt-2">Current Focus:</div>
              <div className="text-xs">• Advanced Data Structures & Algorithms</div>
              <div className="text-xs">• Full-Stack Development (MERN)</div>
              <div className="text-xs">• Applied Machine Learning</div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="text-pink-400 font-mono text-sm space-y-3">
            <div className="bg-gradient-to-r from-pink-400/10 to-pink-300/5 border-2 border-pink-400 rounded-lg p-3 sm:p-4">
              <div className="font-bold text-pink-200 mb-3 text-sm sm:text-base">Get in Touch</div>
              
              <div className="space-y-2 text-pink-300 text-xs sm:text-sm">
                <div className="break-words">
                  <span className="text-pink-200">Email:</span>{' '}
                  <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="hover:text-pink-100 underline break-all">
                    {PORTFOLIO_DATA.contact.email}
                  </a>
                </div>
                
                <div className="break-words">
                  <span className="text-pink-200">GitHub:</span>{' '}
                  <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-pink-100 underline break-all">
                    {PORTFOLIO_DATA.contact.github}
                  </a>
                </div>
                
                <div className="break-words">
                  <span className="text-pink-200">LeetCode:</span>{' '}
                  <a href={PORTFOLIO_DATA.contact.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-pink-100 underline break-all">
                    {PORTFOLIO_DATA.contact.leetcode}
                  </a>
                </div>
                
                <div className="break-words">
                  <span className="text-pink-200">LinkedIn:</span>{' '}
                  <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pink-100 underline break-all">
                    {PORTFOLIO_DATA.contact.linkedin}
                  </a>
                </div>
              </div>
              
              <div className="mt-3 sm:mt-4 text-xs text-pink-300 border-t border-pink-400/30 pt-3">
                Open to internships, technical collaborations, and project opportunities.
              </div>
            </div>
          </div>
        );

      case 'fun':
        return null;

      default:
        return (
          <div className="text-pink-400 font-mono text-xs sm:text-sm space-y-4">
            <div className="text-base sm:text-lg font-bold text-pink-300">
              $ {PORTFOLIO_DATA.name}
            </div>
            <div className="text-xs sm:text-sm">{PORTFOLIO_DATA.bio}</div>
            <div className="mt-4 text-xs sm:text-sm">Type 'help' to see available commands.</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-pink-400 font-mono flex flex-col">
      {/* Top Navigation Bar */}
      <div className="border-b-2 border-pink-400 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-2 sm:px-3 md:px-8 py-2 md:py-3 flex items-center justify-between gap-1 sm:gap-2 md:gap-4 flex-wrap">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 md:py-2 border border-pink-400 rounded hover:bg-pink-400/10 transition-all duration-300 hover:shadow-md hover:shadow-pink-400/30 text-xs sm:text-sm text-pink-400 flex-shrink-0 min-h-[44px] min-w-[44px] justify-center sm:justify-start"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Command Buttons - Responsive Grid */}
          <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-2 justify-center flex-1">
            {['help', 'about', 'skills', 'projects', 'resume', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className={`px-1.5 sm:px-2 md:px-3 py-1 border-2 border-pink-400 text-xs sm:text-sm font-mono transition-all duration-300 rounded min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
                  currentSection === cmd
                    ? 'bg-pink-400 text-black shadow-lg shadow-pink-400/50'
                    : 'bg-transparent text-pink-400 hover:bg-pink-400/10 hover:shadow-md hover:shadow-pink-400/30'
                }`}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-8 py-3 sm:py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          {renderSection()}
        </div>
      </div>

      {/* Command Input at Bottom */}
      <div className="border-t-2 border-pink-400 bg-black/50 backdrop-blur-sm sticky bottom-0 z-40 px-2 sm:px-3 md:px-8 py-2 md:py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-pink-400 flex-shrink-0">$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommand(inputValue);
              }
            }}
            className="flex-1 bg-transparent outline-none text-pink-400 placeholder-pink-400/50 font-mono text-xs sm:text-sm"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
