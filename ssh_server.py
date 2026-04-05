#!/usr/bin/env python3
"""
Terminal Portfolio SSH Server
Allows users to access the portfolio via SSH with terminal-based interface
"""

import paramiko
import socket
import sys
import os
from io import StringIO
import threading

# Portfolio data
PORTFOLIO_DATA = {
    'name': 'Shambhvi Sharma',
    'title': 'Computer Engineering Student',
    'bio': 'Software-focused computer engineering student with experience building backend systems, data pipelines, and full-stack applications.',
    'about': '''I am a software-focused computer engineering student with experience building backend systems, data pipelines, and full-stack applications. I work primarily with the MERN stack and have a strong foundation in data structures and problem solving.

My work emphasizes clean system design, efficient data handling, and building applications that are practical, scalable, and production-oriented. I am currently expanding my expertise in machine learning and real-world system integration.

I aim to grow into a highly capable software engineer with strong problem-solving skills and impactful projects.''',
    
    'skills': {
        'languages': ['C++', 'Python', 'JavaScript'],
        'webDev': ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST API Design'],
        'cs': ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Operating Systems (fundamentals)'],
        'ml': ['NumPy', 'Pandas', 'Model fundamentals (ongoing)'],
        'tools': ['Git & GitHub', 'Postman', 'VS Code']
    },
    
    'projects': [
        {
            'name': 'NeuroVoice',
            'description': 'AI-based voice-focused application (ongoing development). Designed to process and analyze voice data for intelligent interaction with focus on real-time processing and scalable backend architecture.'
        },
        {
            'name': 'Dividend Analysis Pipeline',
            'description': 'Developed a financial data pipeline to analyze dividend events. Transitioned system logic from ex-date to announcement-date alignment, computed next-day returns and structured financial metrics with emphasis on data accuracy, transformation, and pipeline reliability.'
        },
        {
            'name': 'Rehabify',
            'description': 'Application focused on rehabilitation and healthcare workflows. Designed with real-world usability and system integration in mind, exploring advanced feature integrations for enhanced functionality.'
        }
    ],
    
    'contact': {
        'email': 'shambhvi@example.com',
        'github': 'https://github.com/shambhvi',
        'linkedin': 'https://linkedin.com/in/shambhvi'
    }
}

ASCII_ART = r"""....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:+??????%%%???%%%%%%%%
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
**;;++:;:;:,::;+?;+;;:::::::*;:;;+;;:::::.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,++++++
?;:;+;:::;:::::;;;;+;::::::,*;+**;;;;,++;,:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,+++;;;
?;;+:::;;+;;:::;,:;::,:+++;:*;*?**??+;;+;;:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,++;;;;
;?+::;+?+;:;;:,;;:::;++****??*%%??%???**;+;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:++;;;;
:+*;:++;::::+;:+:::;;**????%%???%???*???**;;:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:,,:,,:,,,,,:::,:+;;;;;
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
???*****???%?%?%%%%%???*+*%%%SSS??????%%SS%???S%?+;:;*?%?????*S######@@@@@@@@@@@@;::;%%%?,,::::::::;
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
#%%###SS%%%%?++?#****+;::,.;:,,,,,,,,,,,:;+**?********************??%*:,:;+**??%?%%?*+++++;;;;;;;;;;
%%S##SS#SS%?**+?#+;:,,,,,,,::,,,,,,,:;+**??***********************??%;::;+**??%S##SS#S?+++++;;;;;;;;
%SS##SSSS?*+*+:+S,,,,,,,,,,,,,,,:;+*???************?**************??*:::+**???%SSSSSSS%**+++++;;;;;;
S%S#S?*++;:,,,.;*,,,,,,,,,,,:;+*????*************????????????????**?+::;+*???%SS######S%??***++++;;;
%+%#?:,,,,,,,,,:::,,,,,,:;+*??????*?************??????????????????**;;;+*???%###SS####S%%%%%%???**++
;::?+.,,,,,,,,,,,,,,:;+*??????????***********?????????????????%%%?+*+;;+?%%%#####%S###%????%%%%%%%%%
,,,++,::,,,,,,,::;+*?????*?????????******?????????????????%%%%%%%%**++*?%%%%SSSSSS####%%%%????????%?
,,:::::,,,,,:;+*??????**??????????????????????????????%%%%%%%%####?*++?%%%?%##########S%%???????***+
,,,:,,,,:;+*???????????????????????????????????????%%%%%%%S%%S#SSS%?*+*?%%?%##########S%?****??****+
,,,,:;+*??????**????????????????????????????????%%%%%%SSSS%%SSS%SSS?*+**???%#####SSS%%%??*****??*+++"""


class PortfolioSSHServer(paramiko.ServerInterface):
    def check_auth_password(self, username, password):
        # Simple auth - accept any username/password for demo
        # In production, use proper authentication
        return paramiko.AUTH_SUCCESSFUL

    def check_channel_request(self, kind, chanid):
        if kind == 'session':
            return paramiko.OPEN_SUCCEEDED
        return paramiko.OPEN_FAILED_ADMINISTRATIVELY_PROHIBITED

    def check_channel_shell_request(self, channel):
        return paramiko.OPEN_SUCCEEDED


class TerminalSession:
    def __init__(self, channel):
        self.channel = channel
        self.command_history = []
        self.current_section = 'home'

    def render_help(self):
        return """Available commands:

about      → Professional summary
skills     → Technical expertise
projects   → Selected work
resume     → Experience & education
contact    → Contact information
fun        → Fun facts & ASCII art
clear      → Clear terminal
exit       → Exit session
"""

    def render_about(self):
        return f"""{PORTFOLIO_DATA['name']}
{PORTFOLIO_DATA['title']}

{PORTFOLIO_DATA['about']}
"""

    def render_skills(self):
        output = "Languages:\n"
        output += ", ".join(PORTFOLIO_DATA['skills']['languages']) + "\n\n"
        
        output += "Web Development:\n"
        output += ", ".join(PORTFOLIO_DATA['skills']['webDev']) + "\n\n"
        
        output += "Core Computer Science:\n"
        output += ", ".join(PORTFOLIO_DATA['skills']['cs']) + "\n\n"
        
        output += "Machine Learning:\n"
        output += ", ".join(PORTFOLIO_DATA['skills']['ml']) + "\n\n"
        
        output += "Tools & Workflow:\n"
        output += ", ".join(PORTFOLIO_DATA['skills']['tools']) + "\n"
        
        return output

    def render_projects(self):
        output = ""
        for project in PORTFOLIO_DATA['projects']:
            output += f"{project['name']}\n"
            output += f"{project['description']}\n\n"
        return output

    def render_resume(self):
        output = """Experience:
Quantitative AI Intern — CiteSert (Remote)
Dec 2025 – Present
• Built and refined financial data pipelines
• Implemented dividend-based analytical models
• Focused on producing clean, reliable, and structured outputs

Education:
B.Tech in Computer Engineering (Second Year)

Current Focus:
• Advanced Data Structures & Algorithms
• Full-Stack Development (MERN)
• Applied Machine Learning
"""
        return output

    def render_contact(self):
        output = f"""Email: {PORTFOLIO_DATA['contact']['email']}
GitHub: {PORTFOLIO_DATA['contact']['github']}
LinkedIn: {PORTFOLIO_DATA['contact']['linkedin']}

Open to internships, technical collaborations, and project opportunities.
"""
        return output

    def render_fun(self):
        return ASCII_ART + "\n"

    def render_home(self):
        return f"""$ {PORTFOLIO_DATA['name']}
{PORTFOLIO_DATA['bio']}

Type 'help' to see available commands.
"""

    def process_command(self, cmd):
        cmd = cmd.strip().lower()
        
        if not cmd:
            return ""
        
        self.command_history.append(cmd)
        
        if cmd == 'help':
            self.current_section = 'help'
            return self.render_help()
        elif cmd == 'about':
            self.current_section = 'about'
            return self.render_about()
        elif cmd == 'skills':
            self.current_section = 'skills'
            return self.render_skills()
        elif cmd == 'projects':
            self.current_section = 'projects'
            return self.render_projects()
        elif cmd == 'resume':
            self.current_section = 'resume'
            return self.render_resume()
        elif cmd == 'contact':
            self.current_section = 'contact'
            return self.render_contact()
        elif cmd == 'fun':
            self.current_section = 'fun'
            return self.render_fun()
        elif cmd == 'clear':
            return "\033[2J\033[H"  # ANSI clear screen
        elif cmd == 'exit' or cmd == 'quit':
            return "Goodbye!\n"
        else:
            return f"Command not found: {cmd}\nType 'help' for available commands.\n"


def handle_client(client, addr):
    """Handle a client connection"""
    try:
        transport = paramiko.Transport(client)
        
        # Generate host key
        host_key = paramiko.RSAKey.generate(1024)
        transport.add_server_key(host_key)
        
        server = PortfolioSSHServer()
        transport.start_server(server=server)
        
        # Get channel
        channel = transport.accept(20)
        if channel is None:
            return
        
        session = TerminalSession(channel)
        
        # Send welcome message
        channel.send("Welcome to Shambhvi's Terminal Portfolio!\n")
        channel.send("Type 'help' for available commands.\n\n")
        channel.send("$ ")
        
        # Read commands
        while True:
            try:
                cmd = channel.recv(1024).decode('utf-8').strip()
                
                if not cmd:
                    channel.send("$ ")
                    continue
                
                if cmd == 'exit' or cmd == 'quit':
                    channel.send("Goodbye!\n")
                    break
                
                output = session.process_command(cmd)
                channel.send(output + "$ ")
                
            except Exception as e:
                break
        
        channel.close()
        transport.close()
        
    except Exception as e:
        print(f"Error handling client {addr}: {e}")
    finally:
        client.close()


def start_ssh_server(host='0.0.0.0', port=2222):
    """Start the SSH server"""
    print(f"Starting Terminal Portfolio SSH Server on {host}:{port}")
    print("To connect: ssh -p 2222 user@localhost")
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((host, port))
    sock.listen(100)
    
    try:
        while True:
            client, addr = sock.accept()
            print(f"Connection from {addr}")
            thread = threading.Thread(target=handle_client, args=(client, addr))
            thread.daemon = True
            thread.start()
    except KeyboardInterrupt:
        print("\nShutting down...")
    finally:
        sock.close()


if __name__ == '__main__':
    port = int(os.environ.get('SSH_PORT', 2222))
    start_ssh_server(port=port)
