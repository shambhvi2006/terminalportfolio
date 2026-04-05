# Terminal Portfolio

A unique terminal-style portfolio that works both in the browser and via SSH. Access Shambhvi's professional information through an interactive terminal interface.

## Features

- 🌐 **Web Browser Access**: Interactive terminal interface at `http://localhost:3000`
- 🔌 **SSH Access**: Connect via SSH to access the portfolio from your terminal
- 🎨 **ASCII Art**: Beautiful ASCII art representation of the portfolio owner
- ⌨️ **Command-Based Navigation**: Intuitive command structure for browsing content
- 📱 **Responsive Design**: Works on desktop and mobile browsers

## Available Commands

- `help` - Show available commands
- `about` - Professional summary and bio
- `skills` - Technical expertise and tools
- `projects` - Selected work and projects
- `resume` - Experience and education
- `contact` - Contact information
- `fun` - ASCII art and fun facts
- `clear` - Clear the terminal screen
- `exit` / `quit` - Exit the SSH session

## Web Browser Access

### Setup

1. Install dependencies:
```bash
cd /home/ubuntu/terminal-portfolio
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Usage

- Type commands in the input field at the bottom of the terminal
- Press Enter to execute a command
- Use the quick command buttons for faster navigation
- The terminal displays output from your commands

## SSH Access

### Setup

1. Ensure Python 3 is installed with paramiko:
```bash
pip3 install paramiko
```

2. Start the SSH server:
```bash
cd /home/ubuntu/terminal-portfolio
python3 ssh_server.py
```

The server will start on port 2222 by default.

### Connecting via SSH

From any terminal:

```bash
ssh -p 2222 user@localhost
```

Or with a remote server:

```bash
ssh -p 2222 user@your-server-ip
```

**Note**: The demo uses simple authentication. For production, implement proper SSH key authentication.

### SSH Usage

Once connected:

```
Welcome to Shambhvi's Terminal Portfolio!
Type 'help' for available commands.

$ help
Available commands:

about      → Professional summary
skills     → Technical expertise
projects   → Selected work
resume     → Experience & education
contact    → Contact information
fun        → Fun facts & ASCII art
clear      → Clear terminal
exit       → Exit session

$ about
Shambhvi Sharma
Computer Engineering Student

I am a software-focused computer engineering student...
```

## Project Structure

```
terminal-portfolio/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx          # Main terminal interface
│   │   ├── App.tsx               # React app setup
│   │   └── index.css             # Styling
│   └── index.html                # HTML entry point
├── ssh_server.py                 # Python SSH server
├── package.json                  # Dependencies
└── README.md                      # This file
```

## Customization

### Update Portfolio Content

Edit `/home/ubuntu/terminal-portfolio/client/src/pages/Home.tsx`:

```tsx
const PORTFOLIO_DATA = {
  name: 'Your Name',
  title: 'Your Title',
  // ... update other fields
};
```

Also update `/home/ubuntu/terminal-portfolio/ssh_server.py` with the same data.

### Change ASCII Art

Replace the `ASCII_ART` variable in both files with your own ASCII art.

### Customize Colors

Edit `/home/ubuntu/terminal-portfolio/client/src/index.css` to change the terminal color scheme.

## Deployment

### Browser Version

The web version can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Manus (built-in hosting)

Build for production:
```bash
pnpm build
```

### SSH Server

Deploy the SSH server on your own server:

1. Copy `ssh_server.py` to your server
2. Install paramiko: `pip3 install paramiko`
3. Run the server with a process manager (systemd, supervisor, etc.)

Example systemd service file:

```ini
[Unit]
Description=Terminal Portfolio SSH Server
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/terminal-portfolio
ExecStart=/usr/bin/python3 /home/ubuntu/terminal-portfolio/ssh_server.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## Security Notes

⚠️ **For Production Use**:

1. Implement proper SSH key authentication instead of password auth
2. Use a firewall to restrict SSH access
3. Run the SSH server on a non-standard port
4. Consider using a reverse proxy (nginx) for the web version
5. Enable HTTPS for the web version
6. Implement rate limiting for SSH connections

## Technologies Used

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI

### Backend (SSH)
- Python 3
- Paramiko (SSH library)

## License

MIT

## Contact

For questions or suggestions, reach out through the contact information in the portfolio.
