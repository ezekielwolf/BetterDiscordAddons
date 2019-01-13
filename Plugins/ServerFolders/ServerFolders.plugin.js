//META{"name":"ServerFolders"}*//

class ServerFolders {
	getName () {return "ServerFolders";}

	getVersion () {return "5.9.8";}

	getAuthor () {return "DevilBro";}

	getDescription () {return "Adds the feature to create folders to organize your servers. Right click a server > 'Serverfolders' > 'Create Server' to create a server. To add servers to a folder hold 'Ctrl' and drag the server onto the folder, this will add the server to the folderlist and hide it in the serverlist. To open a folder click the folder. A folder can only be opened when it has at least one server in it. To remove a server from a folder, open the folder and either right click the server > 'Serverfolders' > 'Remove Server from Folder' or hold 'Del' and click the server in the folderlist.";}
	
	initConstructor () {
		this.labels = {};
		
		this.patchModules = {
			"Guild":["componentDidMount","componentWillUnmount"]
		};
		
		this.css = `
			.${this.getName()}-modal .ui-icon-picker-icon {
				position: relative;
				width: 70px;
				height: 70px;
				border: 4px solid transparent;
				border-radius: 12px;
				margin: 0;
			}
			.${this.getName()}-modal .ui-icon-picker-icon .ui-picker-inner {
				margin: 5px 5px;
				width: 60px;
				height: 60px;
				background-repeat: no-repeat;
				background-clip: padding-box;
				background-position: 50%;
				background-size: cover;
				border-radius: 12px;
			}
			.${this.getName()}-modal .ui-icon-picker-icon.selected ${BDFDB.dotCN.hovercardbutton} {
				display: none !important;
			}
			.${this.getName()}-modal .ui-icon-picker-icon ${BDFDB.dotCN.hovercardbutton} {
				position: absolute;
				top: -10px;
				right: -10px;
			}
			.${this.getName()}-modal .ui-icon-picker-icon.preview.nopic .ui-picker-inner {
				background-image: url('data:image/svg+xml; utf8, <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="400" height="400"><path d="M40.400 17.178 C 39.850 17.366,38.793 17.538,38.050 17.560 C 33.351 17.699,23.397 24.788,21.381 29.432 C 21.087 30.109,20.566 30.896,20.223 31.181 C 19.880 31.465,19.600 31.866,19.600 32.071 C 19.600 32.276,19.236 33.242,18.792 34.218 C 16.345 39.589,16.345 49.611,18.792 54.982 C 19.236 55.958,19.600 56.918,19.600 57.116 C 19.600 57.314,19.960 57.802,20.400 58.200 C 20.840 58.598,21.200 59.131,21.200 59.385 C 21.200 60.391,25.680 64.942,91.505 130.800 C 128.995 168.310,159.849 199.326,160.068 199.724 C 160.409 200.344,150.950 209.964,93.989 266.924 C 18.798 342.113,19.600 341.292,19.600 343.126 C 19.600 343.283,19.250 344.065,18.822 344.864 C 15.429 351.195,15.958 362.918,19.932 369.440 C 22.094 372.990,27.474 378.800,28.598 378.800 C 28.861 378.800,29.402 379.160,29.800 379.600 C 30.198 380.040,30.703 380.400,30.922 380.400 C 31.141 380.400,32.238 380.831,33.360 381.358 C 34.482 381.886,36.480 382.533,37.800 382.797 C 43.786 383.994,44.323 384.027,47.299 383.386 C 48.895 383.042,51.010 382.619,52.000 382.446 C 52.990 382.274,54.517 381.743,55.394 381.266 C 56.271 380.790,57.188 380.400,57.432 380.400 C 57.676 380.400,58.202 380.040,58.600 379.600 C 58.998 379.160,59.598 378.800,59.932 378.800 C 60.267 378.800,91.725 347.615,129.839 309.500 C 169.057 270.281,199.496 240.145,199.964 240.073 C 200.602 239.975,216.001 255.193,267.495 306.814 C 327.046 366.511,339.531 378.800,340.627 378.800 C 340.798 378.800,341.265 379.097,341.667 379.461 C 345.728 383.136,361.013 384.409,365.685 381.461 C 366.188 381.143,367.024 380.757,367.541 380.602 C 370.583 379.691,376.623 374.200,379.382 369.836 C 385.105 360.785,384.039 346.409,377.039 338.228 C 376.084 337.113,344.846 305.743,307.621 268.517 C 255.329 216.224,239.969 200.647,240.070 200.009 C 240.143 199.545,270.062 169.288,308.216 131.091 C 345.625 93.641,376.723 62.370,377.324 61.600 C 384.286 52.678,385.036 40.621,379.277 30.171 C 376.136 24.469,367.906 18.537,361.668 17.477 C 354.656 16.286,345.095 17.665,341.883 20.331 C 341.567 20.594,340.549 21.318,339.622 21.941 C 338.695 22.563,307.031 53.972,269.259 91.737 C 231.486 129.501,200.330 160.400,200.022 160.400 C 199.714 160.400,168.938 129.869,131.631 92.554 C 56.225 17.131,60.288 21.047,55.200 18.887 C 51.591 17.354,42.836 16.343,40.400 17.178z" fill="rgb(220,43,67)"></path></svg>');
			}
			${BDFDB.dotCN.guild}.folder ${BDFDB.dotCN.avataricon} {
				background-clip: padding-box !important;
				background-position: center !important;
				background-size: cover !important;
			}
			${BDFDB.dotCN.guild}.folder ${BDFDB.dotCN.badge}.folder.count {
				background: #7289DA;
				top: -2px;
				left: -2px;
				right: unset;
				bottom: unset;
			}
			${BDFDB.dotCN.guild}.serverfolders-dragpreview {
				pointer-events: none !important;
				position: absolute !important;
				opacity: 0.5 !important;
				z-index: 10000 !important;
			}
			${BDFDB.dotCN.guild}.serverfolders-dragpreview,
			${BDFDB.dotCN.guild}.serverfolders-dragpreview ${BDFDB.dotCN.guildinner},
			${BDFDB.dotCN.guild}.serverfolders-dragpreview ${BDFDB.dotCN.guildinner} a,
			${BDFDB.dotCN.guild}.serverfolders-dragpreview ${BDFDB.dotCNS.guildinner + BDFDB.dotCN.guildicon} {
				border-radius: 50% !important;
				width: 50px !important;
				height: 50px !important;
			}
			${BDFDB.dotCN.guild}.serverfolders-dragpreview:before,
			${BDFDB.dotCN.guild}.serverfolders-dragpreview:after,
			${BDFDB.dotCN.guild}.serverfolders-dragpreview ${BDFDB.dotCN.badge} {
				display: none !important;
			}
			${BDFDB.dotCN.guild}.serverfolders-dragpreview ${BDFDB.dotCN.avataricon} {
				background-color: transparent !important;
				overflow: hidden !important;
			}
			${BDFDB.dotCN.guildswrapper}.foldercontent {
				transition: width .3s linear !important;
			}
			${BDFDB.dotCN.guildswrapper}.foldercontent .folderseparator {
				margin-top: 10px;
			}
			${BDFDB.dotCN.guildswrapper}.foldercontent.foldercontentclosed {
				width: 0px !important;
			}`;

		this.serverContextEntryMarkup =
			`<div class="${BDFDB.disCN.contextmenuitemgroup}">
				<div class="${BDFDB.disCN.contextmenuitem} serverfolders-item ${BDFDB.disCN.contextmenuitemsubmenu}">
					<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_servercontext_serverfolders_text</div></span>
					<div class="${BDFDB.disCN.contextmenuhint}"></div>
				</div>
			</div>`;
			
		this.serverContextSubMenuMarkup = 
			`<div class="${BDFDB.disCN.contextmenu} serverfolders-submenu">
				<div class="${BDFDB.disCN.contextmenuitemgroup}">
					<div class="${BDFDB.disCN.contextmenuitem} createfolder-item">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_serversubmenu_createfolder_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
					<div class="${BDFDB.disCN.contextmenuitem} removefromfolder-item ${BDFDB.disCN.contextmenuitemdisabled}">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_serversubmenu_removefromfolder_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
				</div>
			</div>`;
			
		this.folderContextMarkup = 
			`<div class="${BDFDB.disCN.contextmenu} serverfolder-contextmenu">
				<div class="${BDFDB.disCN.contextmenuitemgroup}">
					<div class="${BDFDB.disCN.contextmenuitem} unreadfolder-item ${BDFDB.disCN.contextmenuitemdisabled}">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_foldercontext_unreadfolder_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
					<div class="${BDFDB.disCN.contextmenuitem} autounreadfolder-item ${BDFDB.disCN.contextmenuitemtoggle}">
						<div class="${BDFDB.disCN.contextmenulabel} DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_foldercontext_autounreadfolder_text</div></div>
						<div class="${BDFDB.disCNS.contextmenucheckbox + BDFDB.disCN.contextmenucheckbox2}">
							<div class="${BDFDB.disCN.contextmenucheckboxinner}">
								<input class="${BDFDB.disCN.contextmenucheckboxelement}" type="checkbox">
								<span></span>
							</div>
							<span></span>
						</div>
					</div>
					<div class="${BDFDB.disCN.contextmenuitem} foldersettings-item">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_foldercontext_foldersettings_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
					<div class="${BDFDB.disCN.contextmenuitem} createfolder-item">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_foldercontext_createfolder_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
					<div class="${BDFDB.disCN.contextmenuitem} removefolder-item ${BDFDB.disCN.contextmenuitemdanger}">
						<span class="DevilBro-textscrollwrapper" speed=3><div class="DevilBro-textscroll">REPLACE_foldercontext_removefolder_text</div></span>
						<div class="${BDFDB.disCN.contextmenuhint}"></div>
					</div>
				</div>
			</div>`;
			
		this.folderContentMarkup = 
			`<div class="${BDFDB.disCN.guildswrapper} foldercontent foldercontentclosed">
				<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.firefoxfixscrollflex + BDFDB.disCNS.guildsscrollerwrap + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
					<div class="${BDFDB.disCNS.guilds + BDFDB.disCN.scroller}"></div>
				</div>
			</div>`;
			
		this.folderIconMarkup = 
			`<div class="${BDFDB.disCN.guild} folder">
				<div draggable="true">
					<div class="${BDFDB.disCN.guildinner}" draggable="false" style="border-radius: 25px;">
						<a>
							<div class="${BDFDB.disCNS.avataricon + BDFDB.disCNS.guildicon + BDFDB.disCNS.avatariconsizelarge + BDFDB.disCN.avatariconinactive}"></div>
						</a>
					</div>
				</div>
				<div class="${BDFDB.disCNS.badgewrapper + BDFDB.disCN.badge} folder notifications"></div>
				<div class="${BDFDB.disCNS.badgewrapper + BDFDB.disCN.badge} folder count"></div>
			</div>`;

		this.folderSettingsModalMarkup =
			`<span class="${this.getName()}-modal DevilBro-modal">
				<div class="${BDFDB.disCN.backdrop}"></div>
				<div class="${BDFDB.disCN.modal}">
					<div class="${BDFDB.disCN.modalinner}">
						<div class="${BDFDB.disCNS.modalsub + BDFDB.disCN.modalsizemedium}">
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.modalheader}" style="flex: 0 0 auto; padding-bottom: 10px;">
								<div class="${BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
									<h4 class="${BDFDB.disCNS.h4 + BDFDB.disCNS.headertitle + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.weightsemibold + BDFDB.disCNS.defaultcolor + BDFDB.disCNS.h4defaultmargin + BDFDB.disCN.marginreset}">REPLACE_modal_header_text</h4>
									<div class="${BDFDB.disCNS.modalguildname + BDFDB.disCNS.small + BDFDB.disCNS.size12 + BDFDB.disCNS.height16 + BDFDB.disCN.primary}"></div>
								</div>
								<svg class="${BDFDB.disCNS.modalclose + BDFDB.disCN.flexchild}" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 12 12">
									<g fill="none" fill-rule="evenodd">
										<path d="M0 0h12v12H0"></path>
										<path class="fill" fill="currentColor" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6"></path>
									</g>
								</svg>
							</div>
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCNS.marginbottom8 + BDFDB.disCN.tabbarcontainer}" style="flex: 0 0 auto; padding-right: 12px;">
								<div class="${BDFDB.disCNS.tabbar + BDFDB.disCN.tabbartop}">
									<div tab="folder" class="${BDFDB.disCNS.settingsitemdefault + BDFDB.disCNS.settingsitem + BDFDB.disCNS.settingsnotselected + BDFDB.disCN.tabbaritem}">REPLACE_modal_tabheader1_text</div>
									<div tab="icon" class="${BDFDB.disCNS.settingsitemdefault + BDFDB.disCNS.settingsitem + BDFDB.disCNS.settingsnotselected + BDFDB.disCN.tabbaritem}">REPLACE_modal_tabheader2_text</div>
									<div tab="tooltip" class="${BDFDB.disCNS.settingsitemdefault + BDFDB.disCNS.settingsitem + BDFDB.disCNS.settingsnotselected + BDFDB.disCN.tabbaritem}">REPLACE_modal_tabheader3_text</div>
									<div tab="custom" class="${BDFDB.disCNS.settingsitemdefault + BDFDB.disCNS.settingsitem + BDFDB.disCNS.settingsnotselected + BDFDB.disCN.tabbaritem}">REPLACE_modal_tabheader4_text</div>
								</div>
							</div>
							<div class="${BDFDB.disCNS.scrollerwrap + BDFDB.disCNS.modalcontent + BDFDB.disCNS.scrollerthemed + BDFDB.disCN.themeghosthairline}">
								<div class="${BDFDB.disCNS.scroller + BDFDB.disCN.modalsubinner}">
									<div tab="folder" class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20} tab-content" style="flex: 1 1 auto;">
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_foldername_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<div class="${BDFDB.disCNS.inputwrapper + BDFDB.disCNS.vertical + BDFDB.disCNS.flex + BDFDB.disCNS.directioncolumn + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;"><input type="text" class="${BDFDB.disCNS.inputdefault + BDFDB.disCNS.input + BDFDB.disCN.size16}" id="input-foldername"></div>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstart + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_iconpicker_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8} icons" style="flex: 1 1 auto;"></div>
									</div>
									<div tab="icon" class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20} tab-content" style="flex: 1 1 auto;">
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstart + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_colorpicker1_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8} swatches" style="flex: 1 1 auto;"></div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstart + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_colorpicker2_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8} swatches" style="flex: 1 1 auto;"></div>
									</div>
									<div tab="tooltip" class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20} tab-content" style="flex: 1 1 auto;">
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstart + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_colorpicker3_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8} swatches" style="flex: 1 1 auto;"></div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstart + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_colorpicker4_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8} swatches" style="flex: 1 1 auto;"></div>
									</div>
									<div tab="custom" class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom20} tab-content" style="flex: 1 1 auto;">
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_customopen_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<div class="${BDFDB.disCNS.inputwrapper + BDFDB.disCNS.vertical + BDFDB.disCNS.flex + BDFDB.disCNS.directioncolumn + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
												<input type="text" option="open" class="${BDFDB.disCNS.inputdefault + BDFDB.disCNS.input + BDFDB.disCN.size16}" placeholder="Url or Filepath">
											</div>
											<button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} file-navigator" style="flex: 0 0 auto;">
												<div class="${BDFDB.disCN.buttoncontents}"></div>
												<input type="file" option="open" accept="image/*" style="display:none!important;">
											</button>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_customclosed_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<div class="${BDFDB.disCNS.inputwrapper + BDFDB.disCNS.vertical + BDFDB.disCNS.flex + BDFDB.disCNS.directioncolumn + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">
												<input type="text" option="closed" class="${BDFDB.disCNS.inputdefault + BDFDB.disCNS.input + BDFDB.disCN.size16}" placeholder="Url or Filepath">
											</div>
											<button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} file-navigator" style="flex: 0 0 auto;">
												<div class="${BDFDB.disCN.buttoncontents}"></div>
												<input type="file" option="closed" accept="image/*" style="display:none!important;">
											</button>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.vertical + BDFDB.disCNS.directioncolumn + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCN.nowrap}" style="flex: 1 1 auto;">
											<h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 0 0 auto;">REPLACE_modal_custompreview_text</h3>
										</div>
										<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;">
											<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifycenter + BDFDB.disCN.aligncenter + BDFDB.disCNS.nowrap}" style="flex: 1 1 auto;">
												<div class="ui-icon-picker-icon preview nopic open">
													<div class="ui-picker-inner"></div>
												</div>
												<div class="ui-icon-picker-icon preview nopic closed" style="margin-left: 25px; margin-right: 25px;">
													<div class="ui-picker-inner"></div>
												</div>
												<div class="ui-icon-picker-icon preview nopic switching">
													<div class="ui-picker-inner"></div>
												</div>
											</div>
											<button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} btn-add btn-addcustom" style="flex: 0 0 auto;">
												<div class="${BDFDB.disCN.buttoncontents}"></div>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontalreverse + BDFDB.disCNS.horizontalreverse2 + BDFDB.disCNS.directionrowreverse + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.modalfooter}">
								<button type="button" class="btn-save ${BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorbrand + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow}">
									<div class="${BDFDB.disCN.buttoncontents}">REPLACE_btn_save_text</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</span>`;	
			
		this.folderIcons = [
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB2ElEQVR4Xu2Z4W6DMAwG4f0fmqloq0YJw0dIhLPb7y+qfT0Hr8yTf2ECczhpcBIWkEBYwgIEQFSzhAUIgKhmCQsQAFHNEhYgAKKaJSxAAETvMGsBn1eK3lFDZQmx4zWF1kL6rLCmlli3lamrBd4N6qeNq/VUYogdv1JcK1CPByasmFRrisJqbdWj7RLWAGaBFi5FqSSPHsNLBOAhDIwe6HVnwb4vx1H/KDxN02iw0ENOWGAjEJaw0B0WFiYc/P547yzwPYwI66j9nUiadW7Km5GwzmG91wthCStGAKRWqbqatSw5ng/zXL7bu8FKDKr/nSWs4NAnB9XXLGEFrXrFksPqt5QmB7XZGJo/DZPD2vBpCis5qN0eKqzXZr5fQosLezNYo1nV9N8dYYG3O8lhFSeuyRgmB3U4ccLaL9eHTG6HNapVTS745LD+lEeztmPYD9bIVt0+hsLaanr4I3pyUCFxbruzksMKcQiFfsk1qlkhDqHQGaz/YFVoTj8W3Bwv/sBP3uTdKTVr/Umd1fLoNOofhc/G8dFYysWh/lF4sJHEveMDhS8o01hW9Vt1OOHYVZUsLIBPWMICBEBUs4QFCICoZgkLEABRzRIWIACimiUsQABENQvA+gLIy3lMlnMoMQAAAABJRU5ErkJggg==", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABkElEQVR4Xu3a6xKCIABEYXz/h7bpOl1M94CWMqffywRfK1I2FF+xwBAnDRaxQAnEEgsIgKjNEgsIgKjNEgsIgKjNEgsIgKjNEgsIgOgazRrB+01F15hD4xSy4S0TbUV6n2HLXLLVNqZqJ7g21H0ZtfNpZMiG10xuK6jdg4mVleqSolhbt2rX7RKrg2aBJVRFaUl2fRlWCcBBGIwO+NWeBdddHUfrR+FSSm9Y6CYnFjgRNGON43HKNgyTy40N4uBtV3iRORLU4wD3CRYbxEGxwPUqlli/uxu6Z82f79zgwflXLLEyAY8O4CYnlljfL6uJrzxxYeKgh1JQQbHE8gQ/dxBwz8qOSdeHDv5Ek2uJlVvZLGAlllhEAGTds8QCAiBqs8QCAiBqs8QCAiBqs8QCAiD6t2ad53ikB61//ReNWOCJNGj/nqPxc4g4+LTa4/x7bfkjQutH4c7A8NrxgE7AqtZdNWi53X0mxAKfq1hiAQEQtVliAQEQtVliAQEQtVliAQEQtVliAQEQtVliAQEQPQHGLZBMBnSlGQAAAABJRU5ErkJggg=="},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB5ElEQVR4Xu3b0XaDIBBFUfz/j7YraZqooM4dxljg9HkU2dwh6rJT4s8sMJkrKUxgCSEACyxBQCglWWAJAkIpyQJLEBBKSRZYgoBQSrLAEgSEUm+yZmGMZal3POdwsYd5Lt4L9XflnjFjZ+08m3rhtVBNg1VhzbPdbpqyodSxnXmIO0y94LeOAvWOUw4WNxP9TOrc5fdZVViP+RQSpk8z7ggJTCpOKVVjtQx2C1ZcMPQz1eydw2EVkm02MBe+1jCkDfU8xB6xSZfZwFwIVrru1/Cf/erVRvMZqkuS1RnU5zZRJDftWWD9qrqwPHf74iKGl5duMb7ShmDtPERvV6QXqEs2eLA+O8LpngWWE6vFFjx6HArd4HtOVfieBdb6DuZwzwLLiNU7VGgbgpU/ROy2IVhGrBGgwtoQrPJzfLENwTJijQIV0oZg7b9Ky9oQLCPWSFDVbQjW8dvsVRuC5cTq7d1VicH9Pmt7shax1I9EwFqv+qEHWN/GGqEFq24dlgsC1smzIVjnXwxk33KPkqqQNgTL8Gx4HsKmKkx3BaaixbTt/1LRjpXZwFz4mjtY7YTg3itVk3Xv1d48OljCAoAFliAglJIssAQBoZRkgSUICKUkCyxBQCglWWAJAkIpyQJLEBBKfwAHhexMOBnKeAAAAABJRU5ErkJggg==", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABj0lEQVR4Xu3b2w6CMBBF0fb/PxpDgsQAMbOnExtw+3zoZfUoxGhvvsICPZw02MQCJRBLLCAAojZLLCAAojZLLCAAojZLLCAAojZLLCAAotlmLWCOz2h2vuR0tZdlFp+Feq88M2ftrpOj0YWPQt0abAhrWeJ2vZ+monMn+1B3GV3wrkOg9jqdwep2wkeie8ffZw1hrfu5aBjfZt0VCAyFW2vDWHcGm4JVVww+0shn599hXTQ7bBAObmdY8jbkfai94tCusEE4KFbL3w1rz3rqaOHChIPHZk3dXu3kYYNwUKzBt2HmKb62FHw0Hx2gmXdDACaWWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARH/erHVt/jDk+wnF/yUATnpyNPyzq3Bw25BY8GSfBIbKgsIQ9XFxscCRiiUWEABRmyUWEABRmyUWEABRmyUWEABRmyUWEABRmyUWEABRmwWwXiH/oUz3h3vUAAAAAElFTkSuQmCC"},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABsElEQVR4Xu3Z4XLCIBBFYfP+D52OjbXGxmQPQgrr6b/OrAKfdwnidPEvLDCFKy28iAVCIJZYQACUmiyxgAAoNVliAQFQarLEAgKg1GSJBQRAaWmyZjDGY2npeIXD1X1ZyeRLoX5mXjJm3VUXvhud+LtQQ4P9F9YVjY5dmId6L6MTrpWseisofye6dvzpZsLC6aa62bAQmFhg7xRLLLTrhwMTLrwN754FPoeMWJHlf4fKZEWolppJrN6w5nm87p3+5uicZIkVjG8WqFM2eLGCqbqWiRXEGhFqOSOsDgn3f5oeHUbE2noKll7vojOAWMEWzLZfNX0aZkuVWE9dsrdfidUDVsYWbJYssZbIho4OYgWxskI1aUOxfp8ah20oVhArM1T1NhRrfXDbbUOxglgjQu3dXW3dF1S7zxoR6+i74DOYWGuRXQ+xzsb6hBasdnQQa/v6ePPoIFYQ61OgqrShWK9/wTn8Ig1+/OmpNHQqCBU9rCojVtggXHgDE6unfuh5LjRZPa+l+dzEAsRiiQUEQKnJEgsIgFKTJRYQAKUmSywgAEpNllhAAJSaLLGAACj9AiC1iUwkZlXyAAAAAElFTkSuQmCC", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABgElEQVR4Xu3a7a6CMBREUXj/h8aQKEGMMvvYACX7/r2jLatDrR/j4F8sMMZJg4NYoARiiQUEQNRmiQUEQNRmiQUEQNRmiQUEQNRmiQUEQLTarAmMsY5WxysO1/ZhlclXoV4zr4zZ9qqLz0Yn/i9U12BnYc1odOxiH9o9jE64VbPaXUH9mei149W9ExZuN9W9GxYCEwvsnWKJhXb9uDBx8Dm8exZYB7HEygS8DY/a4Kepv7tyHD/6ERcmDm43+B6hlnfx72CxQRwUC9yvYol1zHtD96z948by8ieWWD8FfDUE+7ZYYv3eTzan+LgwcdBzFqigWGJ5KN07Abln7Qmt/i+WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG2WWEAARG3WlbHmufX4ddgpPwwBC3n1aPzRehzcfqx8dQEwv9ggDq4G7+9HWd/l0PWjMFitW0bFAssqllhAAERtllhAAERtllhAAERtllhAAERtllhAAERtllhAAERtFsB6ACnIiUxdpMfOAAAAAElFTkSuQmCC"},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAByUlEQVR4Xu3a4XKCMBBFYXj/h6bTakEFYU+yjJic/r4Y+LwLNOM4+BcWGMNJg4NYoARiiQUEQNRmiQUEQNRmiQUEQNRmiQUEQNRmiQUEQLS0WRNY4zFaul7hcrmHlZx8KdT/mZesmXvVhZ9GT7wW6qvBqrCmKW43jqul6NqFfcg7jJ7wrEOg5jqtwfKuhH8SvXa8n1WF9Xs9Gw3jl5l3BAJD4WEYqrG+GewjWHnF4J9Uc+/sDmuj2WGDcPD+HaaMIe9D7hEv7QobhINiDec9DS/21Kut5l+pTmlWY1DLayIkD92zxLqpigXaJVYmVqsjeMoNXqyleodjKFbfWPPrVep7VsutSr9nifX8qNy9Z4kVxGodKnUMxVq/rb4dQ7GCWD1ApY2hWNv/MG6OoVhBrF6gUsZQrPd7NqsxFCuI1RNU9RiKtb9t+jSGYvWNtbtlVbyfBfbtvykqFvi2xBILCASjh7ekw8DLQvFf3AbP8EKxQ4vDgFiLgFg3i5BDKPTQrlbHMOQQCokF6tc4Vrgw4eAdrMUxDBuEgxd6xH/sVMQC9GKJBQRA1GaJBQRA1GaJBQRA1GaJBQRA1GaJBQRA1GaJBQRA1GYBrB8F4ZJMlK2iwQAAAABJRU5ErkJggg==", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABkklEQVR4Xu2bywrCQBAEN///0RFFg6iHrtmRNVieK/uo9LQguA0/sYEtJgWHskAIlKUsYACgJktZwABATZaygAGAmixlAQMANVnKAgYAWk3WDvZ4Rqv7Fbfrfaxy+Kqox8kre/beurgaPfisqFMLm5K177m7bXvbiu5dzEPfY/TAhx0i6ojTu7C+m/CV6N3x71lTsq73+ZAwfs2+J5AwBI8xpmWdWdgSWX3B4CvNdOffyfqQ7NhBDN7fYcsY8jz0PvGSrthBDCpr1L8Ne9/10tXiwMTga7KWXq9389hBDCrLMbx9OaZBjUGTBawqS1mOYdpBdy6uohh0DB1Dx9AxhAYAHldRDNpZdpadBUZQWcqCBgAe93YMWvAWvJ0FRlBZyoIGAB73dgxa8Ba8nQVGUFnKggYAHvd2DFrwFrydBUZQWcqCBgAe93YMWvAWvJ0FRvCrsq6L5/9BgadegKMaQvCCy/zUlsoCr0NZygIGAGqylAUMANRkKQsYAKjJUhYwAFCTpSxgAKAmS1nAAEBNFpB1ARZcR0zScgj8AAAAAElFTkSuQmCC"},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAB4ElEQVR4Xu2Z0XWDMAxFxWdH6A6docN3hu7QEfpJT9NAQwJIz0duQefm+8WY6yvZwGD8wgSGcJKgAUuQAFjAEggIUcwClkBAiGIWsAQCQhSzgCUQEKKYBSyBgBDFrA6wRmHMaPR0CxWZcA9QE9DI9aPwu+cikwXWdRn+G9b3NCJz6G5N5AKRifY0C1iRVbrLRBatYdjcv0Qm2dus09h1FFi5CuijRTiEmutfmKXfXv4/XGBuwMyAdaCjQ74jbSO64riBW7PGsa5kwzC4LNwAsH41BdbUjzAr3rwowzgrA9bRYQVKX7iFw0QvvT29wQPrusDeOasoqFmqVLOAdfNsiFl+D52fcfZgVbcqtcED68c6zGp5RbNVhoWtWlRfym5YGNaCD7D2N7hcWIWtetgAW8x6M7PXaUEKw3pg0wLr3cxegLVev/dHhw8ze7446r+29o+8x02kmPVpZk/Aipk1pwqbtdqeWnrWBVZhUJuPgcBarybMEvaSPFjFSzC3DIvD2mxNUs8SND5zFFjC6gELWAIBIYpZQVi7PZwGv6QIrKBV7teuiFmLLzzChc8WdVm4gbPdcc/5AkugCyxgCQSEKGYBSyAgRDELWAIBIYpZwBIICFHMApZAQIhiFrAEAkL0C09hh0yOgU58AAAAAElFTkSuQmCC", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABv0lEQVR4Xu2aYW7CMBSDX26ChHabXZfbTJN2kqKCNpCg+Jk0axp9/MVpky+220JL8EkTKGklwgCWYQJgAcsgYEhxFrAMAoYUZwHLIGBIcRawDAKGFGcByyBgSHFWA1iTccys9BARP1lxD7qMs1qA+l175vw9cLrMITPZlrA+I+LUDQ0xka1hZTesC57AMrahB1i7cVdPsOa5tOxHw0PPpb3Aql5I5QEyHDa/GlaucdXhx4j4fnXEDNGuo7EiLnmTDKwb7Y+I+FrNWdM0rslKKdI4UnB/hQKWDv2fnYAFrOtD8n/EMHEOvR0bK+bENIc1Aqi7fZL9LQWvCh5Yj5FYLHhgAWuxQYnhDY1kIQV0lkETWMB61ksyZVKAs3AWzqp8apIpkwJiSAyJITGsJGAMl5UkBXQWnUVnGZEDFrAqCRjDZX9LwVLBD/Yr6eUPHgVWCnp/DUgt0PhespACYL1562Ds0h6l0jhSgLNwVvv7rD1my5izTJkUEENiSAyNyDWDNR943Pcjr9gydZQTVe7YMMNTRIdZbeVCgGUABBawDAKGFGcByyBgSHEWsAwChhRnAcsgYEhxFrAMAoYUZxmwzq8phkz4oCrBAAAAAElFTkSuQmCC"},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAAByElEQVR4Xu3Z0XaDIBCE4fj+D21OepqkWnRnZPUA/rntxuDnsICdHnxkgUmupPABlhECsMAyBIxSkgWWIWCUkiywDAGjlGSBZQgYpSQLLEPAKCVZJ2PNxvWV0m4emDvQbKg3pjsO5SGk1ziDPAuqGzAV62yoLsBaw3qhqWNKn2bRBdWBXZWsphPWKlb0kDP+rt7757fUL1ydrAwM9RqqgdwfRsaS+6SqCpax8oyOJaWLZH07W2gRFvxei2QxDRcLZhicsKAmWfPcdiCnaXH7oUVYcASrdaStDdi00lvXpWP1CvU5Z+2AgVWI2VbCUrF6T1WULrBIlnqGLtcxDQ2/07FG6Vc/h8SNFTGtZ4H1jW64FQfrhlh7u3im4arxg5WwEkpvB5WD9B36FVjG7h0ssIwGZTR3knU11l2ae0qywPo/7TePO2CBVVwlqo87oyQr+s9Odc8aBWrvHdbfiFUlC6zynq7Y4MG6IZbSr6p61t1S5WC9ahdTEaz9M+iQWOoUdJO1SNcIyXKgjmC9szf3juVC1WAdf2nU8TfVTWnHt5g3dLAMS7DAMgSMUpIFliFglJIssAwBo5RkgWUIGKUkCyxDwCglWQbWE/kykkzUi2UWAAAAAElFTkSuQmCC", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABZklEQVR4Xu3awZKCMBQFUfL/Hx0rKizccNtKKHjVs/WKeGh0FrbNv1igxUuHm1ggArHEAgJgalliAQEwtSyxgACYWpZYQABMLUssIACmlrUYq4PjJ9PHXDB6orOhdkx6HslFmL4hJ7kK6jFgKdZqqEeA3Q1roKXnNP02OztgemJXlXXrwv7C6v1qu7Nrzh9vraXv/Th4+oS3TgWkX1aCFmNVhDru+bAyscY3ykysXjmrb14JWFSWWB9RsSxrzb8SlmVZlsUFwDP8NhQLCICpZYkFBMDUssQCAmBqWWIBATC1LLGAAJhallhAAEwtSywgAKaWJRYQAFPLEgsIgKlliQUEwNSyxAICYGpZYgEBMLUssYAAmE4ra7xm5d9oJVDDIPoVjVifRGOsqmBpVRhr/wiocEsSpP19o7LA52XJqVjgsoolFhAAU8sSCwiAqWWJBQTA1LLEAgJgalliAQEwtSyxgACYvgCckKpMkaN7zAAAAABJRU5ErkJggg=="},
			{"openicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABrklEQVR4Xu3ayZLCMAxFUfz/H50upnQanFjXdi8SXba8TAdJGBfl5issUMJJgzexQBGIJRYQAFErSywgAKJWllhAAEStLLGAAIhaWWIBARC1ssQCAiDaU1kLOH8t2nPNwUvOOZze+CjU+67pdec87eBZ6E3PwrrfNr324KOOH05veCbW6cCGsJZltt34p986QymFPvN6SnrgqnNGqHVgdoJ1YZ0Z6tH7YrUa8Pd9seJWj2QPWMo2fGHhb+PsWAhMLLA4Fkus9rTfrB7CBXMUPN/yvG0USeya7L2RFepwV6SGlR1qF0ys/cb8shFLrMgcb2asrCbR5vf2Z9Y2tA1B/Qxi3Q/Pvnyorj9dlNYrSyzQnGL9F1bmuYV/SItVKUO3aL5RrKzReRXZrM+23jrcNW1tqYq1KUmx/vanlTVjXkVmVqYlRKvLQv++yzK3xJrVgrYhGO5RrAxzq9mCYh3st9faNySaYOc05BAKifWssyjWledW2CAcvHB1hQ3CQbBeuWxULPDRiiUWEABRK0ssIACiVpZYQABErSyxgACIWlliAQEQtbLEAgIgamUBrB+JEUtMl61hQwAAAABJRU5ErkJggg==", 
			"closedicon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAYAAAA4TnrqAAABhUlEQVR4Xu3YwQqDMBBF0eT/P9oiVAji4l1rIh1u1w8zHifTaG/+YoEeJw02sUATiCUWEABRO0ssIACidpZYQABE7SyxgACI2lliAQEQtbPEAgIgeqezNnD9q+idNa+us7wOWvivBR43Tdc9Y71SBy36qSL3m6drH2BP1oDqoAW/VuhX6un112Ft24zarydi7/S5xpM1vnAcPD/ZIlDzO6sQVB2siVtv3KPx7oqD4zZc0VmLoOZ3Vjw6/yMYN0wcnPjX/TZpbBAHW2vrzglr+WKDOCgWe+Wws0DHiyVW/kLvzAKjSCyxwHARSywkAMLxKIqDHkrBfhVLrGmfaDzBg0Eolli+7oAeEEssIgCy8VkzDnrO8pzlOQtsQbHEggIgHs/tOOiAd8A7s8AWFEssKADi8dyOgw54B7wzC2zBaVj7hat9LSVjKP/wNTytKmAICrUgbO2ScaxbUiG8KbFCKLchgBJLLCgA4s4ssYAAiNpZYgEBELWzxAICIGpniQUEQNTOAlgf/fBATBZ555AAAAAASUVORK5CYII="}
		];
		
		this.defaults = {
			settings: {
				closeOtherFolders:	{value:false, 	description:"Close other Folders when opening a Folder."},
				closeTheFolder:		{value:false, 	description:"Close the Folder when selecting a Server."},
				closeAllFolders:	{value:false, 	description:"Close All Folders when selecting a Server."},
				forceOpenFolder:	{value:false, 	description:"Force a Folder to open when switching to a Server of that Folder."},
				showCountBadge:		{value:true, 	description:"Display Badge for Amount of Servers in a Folder."},
				addSeparators:		{value:true, 	description:"Adds separators between Servers of different Folders."}
			}
		};
	}
	
	getSettingsPanel () {
		if (!this.started || typeof BDFDB !== "object") return;
		let settings = BDFDB.getAllData(this, "settings"); 
		let settingshtml = `<div class="${this.getName()}-settings DevilBro-settings"><div class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.size18 + BDFDB.disCNS.height24 + BDFDB.disCNS.weightnormal + BDFDB.disCN.marginbottom8}">${this.getName()}</div><div class="DevilBro-settings-inner">`;
		for (let key in settings) {
			settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">${this.defaults.settings[key].description}</h3><div class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.switchenabled + BDFDB.disCNS.switch + BDFDB.disCNS.switchvalue + BDFDB.disCNS.switchsizedefault + BDFDB.disCNS.switchsize + BDFDB.disCN.switchthemedefault}" style="flex: 0 0 auto;"><input type="checkbox" value="settings ${key}" class="${BDFDB.disCNS.switchinnerenabled + BDFDB.disCN.switchinner} settings-switch"${settings[key] ? " checked" : ""}></div></div>`;
		}
		settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 0 0 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">Reset all Folders.</h3><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorred + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} reset-button" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Reset</div></button></div>`;
		settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 0 0 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">Remove all custom Icons.</h3><button type="button" class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.button + BDFDB.disCNS.buttonlookfilled + BDFDB.disCNS.buttoncolorred + BDFDB.disCNS.buttonsizemedium + BDFDB.disCN.buttongrow} removecustom-button" style="flex: 0 0 auto;"><div class="${BDFDB.disCN.buttoncontents}">Remove</div></button></div>`;
		settingshtml += `</div></div>`;
		
		let settingspanel = BDFDB.htmlToElement(settingshtml);

		BDFDB.initElements(settingspanel, this);

		BDFDB.addChildEventListener(settingspanel, "click", ".reset-button", () => {
			BDFDB.openConfirmModal(this, "Are you sure you want to delete all folders?", () => {
				BDFDB.removeAllData(this, "folders");
				this.resetAllElements();
			});
		});
		BDFDB.addChildEventListener(settingspanel, "click", ".removecustom-button", () => {
			BDFDB.openConfirmModal(this, "Are you sure you want to remove all custom icons?", () => {
				BDFDB.removeAllData(this, "customicons");
			});
		});
		return settingspanel;
	}

	//legacy
	load () {}

	start () {
		let libraryScript = null;
		if (typeof BDFDB !== "object" || typeof BDFDB.isLibraryOutdated !== "function" || BDFDB.isLibraryOutdated()) {
			libraryScript = document.querySelector('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js"]');
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js");
			document.head.appendChild(libraryScript);
		}
		this.startTimeout = setTimeout(() => {this.initialize();}, 30000);
		if (typeof BDFDB === "object" && typeof BDFDB.isLibraryOutdated === "function") this.initialize();
		else libraryScript.addEventListener("load", () => {this.initialize();});
	}

	initialize () {
		if (typeof BDFDB === "object") {
			BDFDB.loadMessage(this);
			
			if (!document.querySelector(BDFDB.dotCN.guildswrapper + ".foldercontent")) {
				let guildswrapper = document.querySelector(BDFDB.dotCN.guildswrapper);
				if (guildswrapper) {
					this.foldercontent = BDFDB.htmlToElement(this.folderContentMarkup);
					guildswrapper.parentElement.insertBefore(this.foldercontent, guildswrapper.nextElementSibling);
				}
			}
			
			this.GuildUtils = BDFDB.WebModules.findByProperties("getGuilds","getGuild");
			this.DiscordConstants = BDFDB.WebModules.findByProperties("Permissions", "ActivityTypes", "StatusTypes");
			this.Animations = BDFDB.WebModules.findByProperties("spring");
			
			setTimeout(() => {
				if (this.foldercontent) {
					let folders = BDFDB.loadAllData(this, "folders"), sortedFolders = [];
					for (let id in folders) sortedFolders[folders[id].position] = folders[id];
					for (let data of sortedFolders) if (data && !document.querySelector(BDFDB.dotCN.guild + ".folder#" + data.folderID)) {
						let folderdiv = this.createFolderDiv(data);
						this.readIncludedServerList(folderdiv).forEach(guilddiv => {this.hideServer(guilddiv, folderdiv);});
					}
					
					BDFDB.WebModules.forceAllUpdates(this);
				}
			},5000);
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}

	stop () {
		if (typeof BDFDB === "object") {
			this.resetAllElements();
			BDFDB.removeEles(this.foldercontent, ".serverfolder-contextmenu");
			BDFDB.unloadMessage(this);
		}
	}

	onSwitch () {
		if (typeof BDFDB === "object" && BDFDB.getData("forceOpenFolder", this, "settings")) {
			let serverObj = BDFDB.getSelectedServer();
			if (!serverObj) return;
			let folderdiv = this.getFolderOfServer(serverObj);
			if (!folderdiv || folderdiv.classList.contains("open")) return;
			this.openCloseFolder(folderdiv);
		}
	}
	
	
	// begin of own functions

	updateSettings (settingspanel) {
		let settings = {};
		for (let input of settingspanel.querySelectorAll(BDFDB.dotCN.switchinner)) {
			settings[input.value] = input.checked;
		}
		BDFDB.saveAllData(settings, this, "settings");
	}
	
	resetAllElements () {
		this.toggleFolderContent(false);
		BDFDB.removeEles(BDFDB.dotCN.guild + ".folder", ".serverfolders-dragpreview");
		BDFDB.readServerList().forEach(info => {this.unhideServer(info.div);});
	}

	changeLanguageStrings () {
		this.serverContextEntryMarkup = 	this.serverContextEntryMarkup.replace("REPLACE_servercontext_serverfolders_text", this.labels.servercontext_serverfolders_text);
		
		this.serverContextSubMenuMarkup = 	this.serverContextSubMenuMarkup.replace("REPLACE_serversubmenu_createfolder_text", this.labels.serversubmenu_createfolder_text);
		this.serverContextSubMenuMarkup = 	this.serverContextSubMenuMarkup.replace("REPLACE_serversubmenu_removefromfolder_text", this.labels.serversubmenu_removefromfolder_text);
		
		this.folderContextMarkup = 			this.folderContextMarkup.replace("REPLACE_foldercontext_unreadfolder_text", this.labels.foldercontext_unreadfolder_text);
		this.folderContextMarkup = 			this.folderContextMarkup.replace("REPLACE_foldercontext_autounreadfolder_text", this.labels.foldercontext_autounreadfolder_text);
		this.folderContextMarkup = 			this.folderContextMarkup.replace("REPLACE_foldercontext_foldersettings_text", this.labels.foldercontext_foldersettings_text);
		this.folderContextMarkup = 			this.folderContextMarkup.replace("REPLACE_foldercontext_createfolder_text", this.labels.serversubmenu_createfolder_text);
		this.folderContextMarkup = 			this.folderContextMarkup.replace("REPLACE_foldercontext_removefolder_text", this.labels.foldercontext_removefolder_text);
		
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_header_text", this.labels.modal_header_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_foldername_text", this.labels.modal_foldername_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_tabheader1_text", this.labels.modal_tabheader1_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_tabheader2_text", this.labels.modal_tabheader2_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_tabheader3_text", this.labels.modal_tabheader3_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_tabheader4_text", this.labels.modal_tabheader4_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_iconpicker_text", this.labels.modal_iconpicker_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_colorpicker1_text", this.labels.modal_colorpicker1_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_colorpicker2_text", this.labels.modal_colorpicker2_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_colorpicker3_text", this.labels.modal_colorpicker3_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_colorpicker4_text", this.labels.modal_colorpicker4_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_customopen_text", this.labels.modal_customopen_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_customclosed_text", this.labels.modal_customclosed_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_modal_custompreview_text", this.labels.modal_custompreview_text);
		this.folderSettingsModalMarkup = 	this.folderSettingsModalMarkup.replace("REPLACE_btn_save_text", this.labels.btn_save_text);
	}
	
	onGuildContextMenu (instance, menu) {
		if (document.querySelector(".DevilBro-modal")) return;
		if (instance.props && instance.props.target && instance.props.guild && !menu.querySelector(".serverfolders-item")) {
			let serverContextEntry = BDFDB.htmlToElement(this.serverContextEntryMarkup);
			menu.appendChild(serverContextEntry);
			let folderitem = serverContextEntry.querySelector(".serverfolders-item");
			folderitem.addEventListener("mouseenter", () => {
				let serverContextSubMenu = BDFDB.htmlToElement(this.serverContextSubMenuMarkup);
				let createitem = serverContextSubMenu.querySelector(".createfolder-item");
				createitem.addEventListener("click", () => {
					instance._reactInternalFiber.return.memoizedProps.closeContextMenu();
					this.createNewFolder(instance.props.target);
				});
				let folderdiv = this.getFolderOfServer(instance.props.guild);
				if (folderdiv) {
					let removeitem = serverContextSubMenu.querySelector(".removefromfolder-item");
					removeitem.classList.remove(BDFDB.disCN.contextmenuitemdisabled);
					removeitem.addEventListener("click", () => {
						instance._reactInternalFiber.return.memoizedProps.closeContextMenu();
						this.removeServerFromFolder(instance.props.guild, folderdiv);
					});
				}
				BDFDB.appendSubMenu(e.currentTarget, serverContextSubMenu);
			});
		}
	}
	
	processGuild (instance, wrapper, methodnames) {
		if (instance.props && instance.props.guild) {
			if (methodnames.includes("componentDidMount")) {
				let folderdiv = this.getFolderOfServer(instance.props.guild);
				if (folderdiv && !wrapper.getAttribute("folder")) {
					this.hideServer(wrapper, folderdiv);
					this.updateCopyInFolderContent(wrapper, folderdiv);
					this.updateFolderNotifications(folderdiv);
				}
				BDFDB.addEventListener(this, wrapper, "click", () => {
					if (BDFDB.getData("closeAllFolders", this, "settings")) document.querySelectorAll(".folder.open").forEach(openFolder => {this.openCloseFolder(openFolder);});
				});
				BDFDB.addEventListener(this, wrapper, "mousedown", e => {
					if (BDFDB.pressedKeys.includes(17)) {
						e.originalEvent.stopPropagation();
						e.originalEvent.preventDefault();
						let dragpreview = this.createDragPreview(wrapper, e);
						let updatePreview = e2 => {
							this.updateDragPreview(dragpreview, e2);
						};
						let droppedPreview = e2 => {
							let dropfolderdiv = BDFDB.getParentEle(BDFDB.dotCN.guild + ".folder", e2.target);
							if (dropfolderdiv) this.addServerToFolder(instance.props.guild, dropfolderdiv);
							document.removeEventListener("mousemove", updatePreview);
							document.removeEventListener("mouseup", droppedPreview);
							BDFDB.removeEles(dragpreview);
						};
						document.addEventListener("mousemove", updatePreview);
						document.addEventListener("mouseup", droppedPreview);
					}
				});
			}
			if (methodnames.includes("componentWillUnmount")) {
				let folderdiv = this.getFolderOfServer(instance.props.guild);
				if (folderdiv) {
					BDFDB.removeEles(this.foldercontent.querySelectorAll(`[guild="${instance.props.guild.id}"]`));
					this.updateFolderNotifications(folderdiv);
				}
			}
		}
	}
	
	showFolderSettings (folderdiv) {
		if (!folderdiv) return;
		let {folderID,folderName,position,iconID,icons,color1,color2,color3,color4,servers} = BDFDB.loadData(folderdiv.id, this, "folders") || {};
		if (!folderID) return;
		
		let folderSettingsModal = BDFDB.htmlToElement(this.folderSettingsModalMarkup);
		let foldernameinput = folderSettingsModal.querySelector("#input-foldername");
		
		folderSettingsModal.querySelector(BDFDB.dotCN.modalguildname).innerText = folderName || "";
		foldernameinput.value = folderName || "";
		foldernameinput.setAttribute("placeholder", folderName || "");
		this.setIcons(folderSettingsModal, iconID);
		BDFDB.setColorSwatches(folderSettingsModal, color1);
		BDFDB.setColorSwatches(folderSettingsModal, color2);
		BDFDB.setColorSwatches(folderSettingsModal, color3);
		BDFDB.setColorSwatches(folderSettingsModal, color4);
		
		BDFDB.appendModal(folderSettingsModal);
		
		BDFDB.addChildEventListener(folderSettingsModal, "change", "input[type='file'][option]", () => {
			let file = ele.files[0];
			if (file) this.fetchCustomIcon(folderSettingsModal, ele.getAttribute("option"));
		});
		BDFDB.addChildEventListener(folderSettingsModal, "keyup", "input[type='text'][option]", e => {
			if (e.which == 13) this.fetchCustomIcon(folderSettingsModal, e.currentTarget.getAttribute("option"));
		});
		BDFDB.addChildEventListener(folderSettingsModal, "click", ".btn-addcustom", () => {
			this.saveCustomIcon(folderSettingsModal);
		});
		BDFDB.addChildEventListener(folderSettingsModal, "click", ".btn-save", e => {
			e.preventDefault();
			
			folderName = foldernameinput.value.trim();
			folderName = folderName ? folderName : null;
			
			var oldIconID = iconID;
			var selectedIcon = folderSettingsModal.querySelector(".ui-icon-picker-icon.selected");
			iconID = selectedIcon.getAttribute("value");
	
			var oldColor1 = color1;
			var oldColor2 = color2;
			color1 = BDFDB.getSwatchColor(folderSettingsModal, 1);
			color2 = BDFDB.getSwatchColor(folderSettingsModal, 2);
			color3 = BDFDB.getSwatchColor(folderSettingsModal, 3);
			color4 = BDFDB.getSwatchColor(folderSettingsModal, 4);
			
			if (iconID != oldIconID || !BDFDB.equals(color1, oldColor1) || !BDFDB.equals(color2, oldColor2)) {
				let folderIcons = this.loadAllIcons();
				let isOpen = folderdiv.classList.contains("open");
				if (!selectedIcon.classList.contains("custom")) {
					this.changeImgColor(color1, color2, folderIcons[iconID].openicon, (openicon) => {
						icons.openicon = openicon;
						this.changeImgColor(color1, color2, folderIcons[iconID].closedicon, (closedicon) => {
							icons.closedicon = closedicon;
							folderdiv.querySelector(BDFDB.dotCN.avataricon).style.setProperty("background-image", `url(${isOpen ? icons.openicon : icons.closedicon})`);
							BDFDB.saveData(folderID, {folderID,folderName,position,iconID,icons,color1,color2,color3,color4,servers}, this, "folders");
						});
					});
				}
				else {
					icons.openicon = folderIcons[iconID].openicon;
					icons.closedicon = folderIcons[iconID].closedicon;
					folderdiv.querySelector(BDFDB.dotCN.avataricon).style.setProperty("background-image", `url(${isOpen ? icons.openicon : icons.closedicon})`);
					BDFDB.saveData(folderID, {folderID,folderName,position,iconID,icons,color1,color2,color3,color4,servers}, this, "folders");
				}
			}
			else BDFDB.saveData(folderID, {folderID,folderName,position,iconID,icons,color1,color2,color3,color4,servers}, this, "folders");
		});
		foldernameinput.focus();
	}
	
	changeImgColor (color1, color2, icon, callback) {
		color1 = BDFDB.colorCONVERT(color1, "RGBCOMP");
		color2 = BDFDB.colorCONVERT(color2, "RGBCOMP");
		if (!color1 || !color2 || !icon) return;
		let img = new Image();
		img.src = icon;
		img.onload = () => {
			if (icon.indexOf("data:image") == 0 && img.width < 200 && img.height < 200) {
				let can = document.createElement("canvas");
				can.width = img.width;
				can.height = img.height;
				let ctx = can.getContext("2d");
				ctx.drawImage(img, 0, 0);
				let imageData = ctx.getImageData(0, 0, img.width, img.height);
				let data = imageData.data;
				for (let i = 0; i < data.length; i += 4) {
					if (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) {
						data[i] = color1[0];
						data[i + 1] = color1[1];
						data[i + 2] = color1[2];
					}
					else if (data[i] == 255 && data[i + 1] == 255 && data[i + 2] == 255) {
						data[i] = color2[0];
						data[i + 1] = color2[1];
						data[i + 2] = color2[2];
					}
					ctx.putImageData(imageData, 0, 0);
				}
				callback(can.toDataURL("image/png"));
			}
			else {
				callback(img.src);
			}
		};
	}
	
	setIcons (modal, selection) {
		let wrapper = modal.querySelector(".icons");
		if (!wrapper) return;
		BDFDB.removeEles(wrapper.childNodes);
		
		let folderIcons = this.loadAllIcons();
		
		wrapper.appendChild(BDFDB.htmlToElement(`<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCNS.nowrap + BDFDB.disCN.margintop4}" style="flex: 1 1 auto;"><div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignstretch + BDFDB.disCN.wrap} ui-icon-picker-row" style="flex: 1 1 auto; display: flex; flex-wrap: wrap; overflow: visible !important;">${Object.getOwnPropertyNames(folderIcons).map(id => `<div class="ui-icon-picker-icon${folderIcons[id].customID ? ' custom' : ''}" value="${id}"><div class="ui-picker-inner" style="background-image: url(${folderIcons[id].closedicon});"></div>${folderIcons[id].customID ? '<div value="' + id + '" class="' + BDFDB.disCN.hovercardbutton + '"></div>' : ''}</div>`).join("")}</div></div>`));
		
		setIcon(wrapper.querySelector(`.ui-icon-picker-icon[value="${folderIcons[selection] ? selection : 0}"]`), false, true);
		
		BDFDB.addChildEventListener(wrapper, "click", ".ui-icon-picker-icon", e => {
			if (e.target.classList.contains(BDFDB.disCN.hovercardbutton)) return;
			setIcon(wrapper.querySelector(".ui-icon-picker-icon.selected"), false, false);
			setIcon(e.currentTarget, true, true);
		});
		BDFDB.addChildEventListener(wrapper, "click", BDFDB.dotCN.hovercardbutton, e => {
			if (e.currentTarget.parentElement.classList.contains("selected")) return;
			BDFDB.removeData(e.currentTarget.getAttribute("value"), this, "customicons");
			e.currentTarget.parentElement.remove();
			BDFDB.showToast(`Custom Icon was deleted.`, {type:"success"});
		});
		BDFDB.addChildEventListener(wrapper, "mouseenter", ".ui-icon-picker-icon", e => {
			setIcon(e.currentTarget, true);
		});
		BDFDB.addChildEventListener(wrapper, "mouseleave", ".ui-icon-picker-icon", e => {
			setIcon(e.currentTarget, false);
		});
		
		function setIcon (icon, hover, enable) {
			if (!icon) return;
			if (enable != undefined) icon.classList.toggle("selected", enable);
			if (hover) {
				icon.querySelector(".ui-picker-inner").style.setProperty("background-image", `url(${folderIcons[icon.getAttribute("value")].openicon})`);
				if (icon.classList.contains("selected")) icon.style.setProperty("background-color", "rgb(255,255,255,0.2)");
				else icon.style.setProperty("background-color", "rgb(255,255,255,0.1)");
			}
			else {
				icon.querySelector(".ui-picker-inner").style.setProperty("background-image", `url(${folderIcons[icon.getAttribute("value")].closedicon})`);
				if (icon.classList.contains("selected")) icon.style.setProperty("background-color", "rgb(255,255,255,0.2)");
				else icon.style.removeProperty("background-color");
			}
		}
	}
	
	loadAllIcons () {
		let icons = {};
		this.folderIcons.forEach((array,i) => {icons[i] = {"openicon":array.openicon,"closedicon":array.closedicon,"customID":null};});
		Object.assign(icons, BDFDB.loadAllData(this, "customicons"));
		return icons;
	}
	
	fetchCustomIcon (modal, type) {
		let successFetchIcon;
		let url = modal.querySelector("input[type='text'][option='" + type + "']").value;
		if (url.indexOf("http") == 0) {
			let request = require("request");
			request(url, (error, response, result) => {
				if (response) {
					let type = response.headers["content-type"];
					if (type && type.indexOf("image") > -1) {
						successFetchIcon();
						return;
					}
				}
				BDFDB.showToast("Use a valid direct link to an image source. They usually end on something like .png, .jpg or .gif.", {type:"danger"});
			});
		}
		else {
			let fs = require("fs")
			if (fs.existsSync(url)) {
				fs.readFile(url, (error, response) => {
					if (!error) {
						url = `data:image/png;base64,${response.toString("base64")}`;
						successFetchIcon();
					}
				});
			}
			else {
				BDFDB.showToast("Could not fetch file. Please make sure the file exists.", {type:"danger"});
			}
		}
		
		successFetchIcon = () => {
			let iconpreview = modal.querySelector(".ui-icon-picker-icon.preview." + type);
			let iconpreviewinner = iconpreview.querySelector(".ui-picker-inner");
			iconpreview.classList.remove("nopic");
			iconpreview.url = url;
			iconpreviewinner.style.setProperty("background-image", `url(${url})`);
			
			let iconpreviewopen = modal.querySelector(".ui-icon-picker-icon.preview.open");
			let iconpreviewclosed = modal.querySelector(".ui-icon-picker-icon.preview.closed");
			if (!iconpreviewopen.classList.contains("nopic") && !iconpreviewclosed.classList.contains("nopic")) {
				let iconpreviewswitching = modal.querySelector(".ui-icon-picker-icon.preview.switching");
				
				let iconpreviewopenimage = iconpreviewopen.querySelector(".ui-picker-inner").style.getPropertyValue("background-image");
				let iconpreviewclosedimage = iconpreviewclosed.querySelector(".ui-picker-inner").style.getPropertyValue("background-image");
				let iconpreviewswitchinginner = iconpreviewswitching.querySelector(".ui-picker-inner");
				
				iconpreviewswitching.classList.remove("nopic");
				iconpreviewswitchinginner.style.setProperty("background-image", iconpreviewopenimage);
				let switching = true;
				iconpreviewswitching.switchInterval = setInterval(() => {
					switching = !switching; 
					iconpreviewswitchinginner.style.setProperty("background-image", switching ? iconpreviewopenimage : iconpreviewclosedimage);
				},1000);
			}
		};
	}
		
	saveCustomIcon (modal) {
		let iconpreviewopen = modal.querySelector(".ui-icon-picker-icon.preview.open");
		let iconpreviewclosed = modal.querySelector(".ui-icon-picker-icon.preview.closed");
		let iconpreviewswitching = modal.querySelector(".ui-icon-picker-icon.preview.switching");
		if (!iconpreviewopen.classList.contains("nopic") && !iconpreviewclosed.classList.contains("nopic") && !iconpreviewswitching.classList.contains("nopic")) {
			let customID = this.generateID("customicon");
			BDFDB.saveData(customID, {"openicon":iconpreviewopen.url,"closedicon":iconpreviewclosed.url,customID}, this, "customicons");
			modal.querySelectorAll("input[type='text'][option]").forEach((input) => {input.value = "";});
			
			let iconpreviewopeninner = iconpreviewopen.querySelector(".ui-picker-inner");
			let iconpreviewclosedinner = iconpreviewclosed.querySelector(".ui-picker-inner");
			let iconpreviewswitchinginner = iconpreviewswitching.querySelector(".ui-picker-inner");
			
			iconpreviewopen.classList.add("nopic");
			iconpreviewopeninner.style.removeProperty("background-image");
			iconpreviewclosed.classList.add("nopic");
			iconpreviewclosedinner.style.removeProperty("background-image");
			iconpreviewswitching.classList.add("nopic");
			iconpreviewswitchinginner.style.removeProperty("background-image");
			clearInterval(iconpreviewswitching.switchInterval);
			BDFDB.showToast(`Custom Icon was added to selection.`, {type:"success"});
			this.setIcons(modal, modal.querySelector(".ui-icon-picker-icon.selected").getAttribute("value"));
		}
		else {
			BDFDB.showToast(`Add an image for the open and the closed icon.`, {type:"danger"});
		}
	};
	
	createNewFolder (ankerdiv) {
		if (!Node.prototype.isPrototypeOf(ankerdiv)) return;
		let guilddiv = BDFDB.getParentEle(BDFDB.dotCN.guild, ankerdiv);
		if (!guilddiv) return;
		let folderID = 		this.generateID("folder");
		let folderName = 	"";
		let position = 		Array.from(document.querySelectorAll(`div${BDFDB.dotCN.guildseparator}:not(.folderseparator) ~ div${BDFDB.dotCN.guild}`)).indexOf(guilddiv);
		let iconID = 		0;
		let icons = 		Object.assign({},this.folderIcons[0]);
		let autounread = 	false;
		let color1 = 		["0","0","0"];
		let color2 = 		["255","255","255"];
		let color3 = 		null;
		let color4 = 		null;
		let servers = 		[];
		
		this.showFolderSettings(this.createFolderDiv({folderID,folderName,position,iconID,icons,autounread,color1,color2,color3,color4,servers}));
		
		this.updateFolderPositions();
	}
	
	createFolderDiv (data) {
		let folderdiv = BDFDB.htmlToElement(this.folderIconMarkup);
		let serversandfolders = document.querySelectorAll(`div${BDFDB.dotCN.guildseparator}:not(.folderseparator) ~ div${BDFDB.dotCN.guild}`);
		let insertnode = serversandfolders[data.position > serversandfolders.length - 1 ? serversandfolders.length - 1 : data.position];
		insertnode.parentElement.insertBefore(folderdiv, insertnode);
		
		folderdiv.id = data.folderID;
		folderdiv.classList.add("closed");
		folderdiv.querySelector(BDFDB.dotCN.avataricon).style.setProperty("background-image", `url(${data.icons.closedicon})`);
		folderdiv.addEventListener("click", () => {
			clearTimeout(folderdiv.dragTimeout);
			if (BDFDB.getData("closeOtherFolders", this, "settings")) {
				document.querySelectorAll(".folder.open").forEach(folder => {
					if (folder != folderdiv) this.openCloseFolder(folder);
				});
			}
			this.openCloseFolder(folderdiv);
		});
		folderdiv.addEventListener("contextmenu", e => {
			clearTimeout(folderdiv.dragTimeout);
			let newdata = BDFDB.loadData(folderdiv.id, this, "folders");
			if (!newdata) return;
			let folderContext = BDFDB.htmlToElement(this.folderContextMarkup);
			let autounreadinput = folderContext.querySelector(".autounreadfolder-item input");
			autounreadinput.checked = newdata.autounread;
			folderContext.querySelector(".autounreadfolder-item").addEventListener("click", () => {
				autounreadinput.checked = !autounreadinput.checked;
				newdata.autounread = autounreadinput.checked;
				BDFDB.saveData(newdata.folderID, newdata, this, "folders");
			});
			folderContext.querySelector(".foldersettings-item").addEventListener("click", () => {
				folderContext.remove();
				this.showFolderSettings(folderdiv);
			});
			folderContext.querySelector(".createfolder-item").addEventListener("click", () => {
				folderContext.remove();
				this.createNewFolder(folderdiv);
			});
			folderContext.querySelector(".removefolder-item").addEventListener("click", () => {
				folderContext.remove();
				this.removeFolder(folderdiv);
			});
				
			let unreadServers = BDFDB.readUnreadServerList(this.readIncludedServerList(folderdiv));
			if (unreadServers.length > 0) {
				let unreaditem = folderContext.querySelector(".unreadfolder-item");
				unreaditem.classList.remove(BDFDB.disCN.contextmenuitemdisabled);
				unreaditem.addEventListener("click", () => {
					folderContext.remove();
					BDFDB.clearReadNotifications(unreadServers);
				});
			}
			BDFDB.appendContextMenu(folderContext, e);
		});
		folderdiv.addEventListener("mousedown", e => {
			clearTimeout(folderdiv.dragTimeout);
			folderdiv.dragTimeout = setTimeout(() => {
				let guildswrap = document.querySelector(`${BDFDB.dotCN.guildswrapper}:not(.foldercontent) ${BDFDB.dotCN.guilds}`);
				if (!guildswrap) return;
				let hovele = null;
				let placeholder = BDFDB.htmlToElement(`<div class="${BDFDB.disCNS.guild + BDFDB.disCN.guildplaceholder} folderplaceholder"></div>`);
				let dragpreview = this.createDragPreview(folderdiv, e);
				let updatePreview = e2 => {
					BDFDB.removeEles(placeholder);
					folderdiv.style.setProperty("display", "none", "important");
					this.updateDragPreview(dragpreview, e2);
					hovele = BDFDB.getParentEle(BDFDB.dotCN.guild + ".folder", e2.target);
					if (hovele) guildswrap.insertBefore(placeholder, hovele.nextSibling);
					else {
						hovele = BDFDB.getParentEle(BDFDB.dotCN.guild, e2.target);
						if (hovele && BDFDB.getReactValue(hovele, "return.memoizedProps.guild") && guildswrap.contains(hovele)) {
							guildswrap.insertBefore(placeholder, hovele.nextSibling);
						}
					}
				};
				let droppedPreview = e2 => {
					document.removeEventListener("mousemove", updatePreview);
					document.removeEventListener("mouseup", droppedPreview);
					BDFDB.removeEles(placeholder, dragpreview);
					folderdiv.style.removeProperty("display");
					if (hovele) {
						guildswrap.insertBefore(folderdiv, hovele.nextSibling);
						this.updateFolderPositions(folderdiv);
					}
				};
				document.addEventListener("mousemove", updatePreview);
				document.addEventListener("mouseup", droppedPreview);
			},100);
			
		});
			
		this.addHoverBehaviour(folderdiv);
		
		BDFDB.saveData(data.folderID, data, this, "folders");
		
		this.updateFolderNotifications(folderdiv);
			
		return folderdiv;
	}
	
	generateID (prefix) {
		let data = BDFDB.loadAllData(this, prefix + "s");
		let id = prefix + "_" + Math.round(Math.random()*10000000000000000);
		return data[id] ? this.generateID(prefix) : id;
	}
	
	addServerToFolder (info, folderdiv) {
		if (!info || !folderdiv) return;
		let guilddiv = BDFDB.getServerDiv(info);
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		if (!guilddiv || !data || data.servers.includes(info.id)) return;
		data.servers.push(info.id);
		BDFDB.saveData(folderdiv.id, data, this, "folders");
		this.hideServer(guilddiv, folderdiv);
		this.updateCopyInFolderContent(guilddiv, folderdiv);
		this.updateFolderNotifications(folderdiv);
		BDFDB.showToast(this.labels.toast_addserver_text.replace("${servername}", info.name).replace("${foldername}", data.folderName ? " " + data.folderName : ""), {type:"success"});
	}
	
	removeServerFromFolder (info, folderdiv) {
		if (!info || !folderdiv) return;
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		if (!data) return;
		BDFDB.removeFromArray(data.servers, info.id);
		BDFDB.saveData(folderdiv.id, data, this, "folders");
		BDFDB.removeEles(this.foldercontent.querySelectorAll(`[guild="${info.id}"]`));
		this.unhideServer(BDFDB.getServerDiv(info));
		this.updateFolderNotifications(folderdiv);
		BDFDB.showToast(this.labels.toast_removeserver_text.replace("${servername}", info.name).replace("${foldername}", data.folderName ? " " + data.folderName : ""), {type:"danger"});
	}
	
	removeFolder (folderdiv) {
		if (!folderdiv) return;
		this.readIncludedServerList(folderdiv).forEach(guilddiv => {this.unhideServer(guilddiv);});
		BDFDB.removeData(folderdiv.id, this, "folders");
		this.closeFolderContent(folderdiv);
		folderdiv.remove();
		this.updateFolderPositions();
	}
	
	getFolderOfServer (idOrInfoOrEle) {
		if (!idOrInfoOrEle) return;
		let id = Node.prototype.isPrototypeOf(idOrInfoOrEle) ? BDFDB.getServerID(idOrInfoOrEle) : (typeof idOrInfoOrEle == "object" ? idOrInfoOrEle.id : idOrInfoOrEle);
		if (!id) return;
		let folders = BDFDB.loadAllData(this, "folders");
		for (let folderid in folders) for (let serverid of folders[folderid].servers) if (serverid == id) return document.querySelector("#" + folderid);
		return null;
	}
	
	hideServer (guilddiv, folderdiv) {
		if (!Node.prototype.isPrototypeOf(guilddiv) || !folderdiv) return;
		guilddiv.setAttribute("folder", folderdiv.id);
		guilddiv.style.setProperty("display", "none", "important");
		if (guilddiv.ServerFoldersChangeObserver && typeof guilddiv.ServerFoldersChangeObserver.disconnect == "function") guilddiv.ServerFoldersChangeObserver.disconnect();
		guilddiv.ServerFoldersChangeObserver = new MutationObserver((changes, _) => {
			changes.forEach(
				(change, i) => {
					let updatefolder = false;
					if (change.type == "attributes" && change.attributeName == "class" && change.target && change.target.classList && change.target.classList.contains(BDFDB.disCN.guild)) updatefolder = true;
					if (change.type == "characterData" && change.target.parentElement.tagName && change.target.parentElement.classList.contains(BDFDB.disCN.badge)) updatefolder = true;
					else if (change.addedNodes.length) change.addedNodes.forEach(node => {if (node.tagName && node.classList.contains(BDFDB.disCN.badge)) updatefolder = true;});
					else if (change.removedNodes.length) change.removedNodes.forEach(node => {if (node.tagName && node.classList.contains(BDFDB.disCN.badge)) updatefolder = true;});
					this.updateCopyInFolderContent(guilddiv, folderdiv);
					if (updatefolder) this.updateFolderNotifications(folderdiv);
				}
			);
		});
		guilddiv.ServerFoldersChangeObserver.observe(guilddiv, {attributes:true, childList:true, characterData: true, subtree:true});
	}
	
	unhideServer (guilddiv) {
		if (!Node.prototype.isPrototypeOf(guilddiv)) return;
		guilddiv.removeAttribute("folder");
		guilddiv.style.removeProperty("display");
		if (guilddiv.ServerFoldersChangeObserver && typeof guilddiv.ServerFoldersChangeObserver.disconnect == "function") guilddiv.ServerFoldersChangeObserver.disconnect();
		delete guilddiv.ServerFoldersChangeObserver;
	}
	
	toggleFolderContent (forceOpenClose) {
		if (!this.foldercontent) return;
		forceOpenClose = forceOpenClose === undefined ? this.foldercontent.classList.contains("foldercontentclosed") : forceOpenClose;
		this.foldercontent.classList.toggle("foldercontentopen", forceOpenClose);
		this.foldercontent.classList.toggle("foldercontentclosed", !forceOpenClose);
	}
	
	openCloseFolder (folderdiv) {
		if (!folderdiv) return;
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		if (!data) return;
		let isClosed = !folderdiv.classList.contains("open");
		if (isClosed) {
			let includedServers = this.readIncludedServerList(folderdiv);
			if (includedServers.length == 0) return;
			folderdiv.classList.add("open");
			folderdiv.classList.remove("closed");
			
			this.toggleFolderContent(true);
			
			let containsguilds = this.foldercontent.querySelectorAll(BDFDB.dotCN.guild).length;
			let settings = BDFDB.getAllData(this, "settings");
			
			setTimeout(() => {
				if (settings.addSeparators && containsguilds) this.foldercontent.querySelector(BDFDB.dotCN.guilds).appendChild(BDFDB.htmlToElement(`<div class="${BDFDB.disCN.guildseparator} folderseparator" folder="${folderdiv.id}"></div>`));
				includedServers.forEach(guilddiv => {this.updateCopyInFolderContent(guilddiv, folderdiv);});
			}, settings.closeOtherFolders && containsguilds ? 300 : 0);
		}
		else this.closeFolderContent(folderdiv);
		
		folderdiv.querySelector(BDFDB.dotCN.avataricon).style.setProperty("background-image", `url(${isClosed ? data.icons.openicon : data.icons.closedicon})`);
	}
	
	closeFolderContent (folderdiv) {
		if (!folderdiv) return;
		folderdiv.classList.remove("open");
		folderdiv.classList.add("closed");
		let includedCopies = this.foldercontent.querySelectorAll(`[folder="${folderdiv.id}"]`);
		for (let copy of includedCopies) copy.removeAttribute("folder");
		if (!this.foldercontent.querySelector("[folder]")) {
			this.toggleFolderContent(false);
			setTimeout(() => {
				let settings = BDFDB.getAllData(this, "settings");
				if (settings.closeOtherFolders) BDFDB.removeEles(includedCopies);
				else if (!settings.closeOtherFolders && !document.querySelector(".folder.open")) BDFDB.removeEles(includedCopies);
			}, 300);
		}
		else BDFDB.removeEles(includedCopies);
		
		let firstchild = this.foldercontent.querySelector(BDFDB.dotCN.guilds).firstElementChild;
		if (firstchild && firstchild.classList.contains("folderseparator")) BDFDB.removeEles(firstchild);
	}
	
	updateCopyInFolderContent (guilddiv, folderdiv) {
		if (!guilddiv || !folderdiv) return;
		if (folderdiv.classList.contains("open")) {
			let info = this.GuildUtils.getGuild(BDFDB.getServerID(guilddiv));
			if (!info) return;
			let oldCopy = this.foldercontent.querySelector("[guild='" + info.id + "']");
			if (oldCopy) {
				this.foldercontent.querySelector(BDFDB.dotCN.guilds).insertBefore(this.createCopyOfServer(guilddiv, folderdiv), oldCopy);
				BDFDB.removeEles(oldCopy);
			}
			else {
				let sameFolderCopies = this.foldercontent.querySelectorAll("[folder='" + folderdiv.id + "']");
				let insertNode = sameFolderCopies.length > 0 ? sameFolderCopies[sameFolderCopies.length-1].nextSibling : null;
				this.foldercontent.querySelector(BDFDB.dotCN.guilds).insertBefore(this.createCopyOfServer(guilddiv, folderdiv), insertNode);
			}
		}
	}
	
	createCopyOfServer (guilddiv, folderdiv) {
		if (!guilddiv || !folderdiv) return;
		let info = this.GuildUtils.getGuild(BDFDB.getServerID(guilddiv));
		if (!info) return;
		let guildcopy = guilddiv.cloneNode(true);
		guildcopy.setAttribute("guild", info.id);
		guildcopy.classList.add("copy");
		guildcopy.style.removeProperty("display");
		guildcopy.addEventListener("mouseenter", () => {
			let EditUsersData = BDFDB.loadData(info.id, "EditServers", "servers") || {};
			let bgColor = BDFDB.colorCONVERT(EditUsersData.color3, "RGB");
			let fontColor = BDFDB.colorCONVERT(EditUsersData.color4, "RGB");
			BDFDB.createTooltip(EditUsersData.name || info.name, guildcopy, {type:"right",selector:(!BDFDB.isObjectEmpty(EditUsersData) ? "EditUsers-tooltip" : ""),style:`color: ${fontColor} !important; background-color: ${bgColor} !important; border-color: ${bgColor} !important;`});
		});
		guildcopy.addEventListener("click", e => {
			clearTimeout(guildcopy.dragTimeout);
			e.preventDefault();
			if (BDFDB.pressedKeys.includes(46)) this.removeServerFromFolder(info, folderdiv);
			else {
				let settings = BDFDB.getAllData(this, "settings");
				if (settings.closeAllFolders) document.querySelectorAll(".folder.open").forEach(openFolder => {this.openCloseFolder(openFolder);});
				else if (settings.closeTheFolder) this.openCloseFolder(folderdiv);
				guilddiv.querySelector("a").click();
			}
		});
		guildcopy.addEventListener("contextmenu", e => {
			clearTimeout(guildcopy.dragTimeout);
			BDFDB.openGuildContextMenu(guilddiv, e);
		});
		guildcopy.addEventListener("mousedown", e => {
			clearTimeout(guildcopy.dragTimeout);
			guildcopy.dragTimeout = setTimeout(() => {
				let hovcopy = null;
				let placeholder = BDFDB.htmlToElement(`<div class="${BDFDB.disCNS.guild + BDFDB.disCN.guildplaceholder} copyplaceholder"></div>`);
				let dragpreview = this.createDragPreview(guilddiv, e);
				
				let updatePreview = e2 => {
					BDFDB.removeEles(placeholder);
					guildcopy.style.setProperty("display", "none", "important");
					this.updateDragPreview(dragpreview, e2);
					if (this.foldercontent.contains(e2.target)) {
						hovcopy = e2.target.classList && e2.target.classList.contains("folderseparator") ? e2.target : BDFDB.getParentEle(BDFDB.dotCN.guild + ".copy", e2.target);
						if (hovcopy && hovcopy.getAttribute("folder") == folderdiv.id) this.foldercontent.querySelector(BDFDB.dotCN.guilds).insertBefore(placeholder, hovcopy.nextSibling);
						else hovcopy = null;
					}
				};
				let droppedPreview = e2 => {
					document.removeEventListener("mousemove", updatePreview);
					document.removeEventListener("mouseup", droppedPreview);
					BDFDB.removeEles(placeholder, dragpreview);
					guildcopy.style.removeProperty("display");
					let dropfolderdiv = BDFDB.getParentEle(BDFDB.dotCN.guild + ".folder", e2.target);
					if (dropfolderdiv && dropfolderdiv != folderdiv) {
						this.removeServerFromFolder(info, folderdiv);
						this.addServerToFolder(info, dropfolderdiv);
					}
					else if (hovcopy) {
						this.foldercontent.querySelector(BDFDB.dotCN.guilds).insertBefore(guildcopy, hovcopy.nextSibling);
						this.updateServerPositions(folderdiv);
					}
				};
				document.addEventListener("mousemove", updatePreview);
				document.addEventListener("mouseup", droppedPreview);
			},100);
		});
			
		let copyinner = guildcopy.querySelector(BDFDB.dotCN.guildinner);
		let isselected = guildcopy.classList.contains(BDFDB.disCN.guildselected);
		let hasicon = !guildcopy.querySelector(BDFDB.dotCN.guildicon).classList.contains(BDFDB.disCN.avatarnoicon);
		guildcopy.querySelector("a").setAttribute("draggable", false);
		copyinner.style.setProperty("border-radius", isselected ? "15px" : "25px");
		copyinner.style.setProperty("background-color", hasicon ? null : BDFDB.colorCONVERT(this.DiscordConstants.Colors[isselected ? "BRAND_PURPLE" : "CHANNELS_GREY"], "RGB"));
			
		this.addHoverBehaviour(guildcopy);
		
		return guildcopy;
	}
	
	createDragPreview (div, e) {
		if (!Node.prototype.isPrototypeOf(div)) return;
		let dragpreview = div.cloneNode(true);
		dragpreview.classList.add("serverfolders-dragpreview");
		dragpreview.style.setProperty("display", "none", "important");
		dragpreview.style.setProperty("pointer-events", "none", "important");
		dragpreview.style.setProperty("left", e.clientX - 25 + "px", "important");
		dragpreview.style.setProperty("top", e.clientY - 25 + "px", "important");
		document.querySelector(BDFDB.dotCN.appmount).appendChild(dragpreview);
		return dragpreview;
	}
	
	updateDragPreview (dragpreview, e) {
		if (!Node.prototype.isPrototypeOf(dragpreview)) return;
		dragpreview.style.removeProperty("display");
		dragpreview.style.setProperty("left", e.clientX - 25 + "px", "important");
		dragpreview.style.setProperty("top", e.clientY - 25 + "px", "important");
	}
	
	updateFolderPositions () {
		let serverAndFolders = document.querySelectorAll(`div${BDFDB.dotCN.guildseparator}:not(.folderseparator) ~ div${BDFDB.dotCN.guild}`);
		for (let i = 0; i < serverAndFolders.length; i++) {
			let folderdiv = BDFDB.getParentEle(BDFDB.dotCN.guild + ".folder", serverAndFolders[i]);
			if (folderdiv) {
				let data = BDFDB.loadData(folderdiv.id, this, "folders");
				if (data) {
					data.position = i;
					BDFDB.saveData(folderdiv.id, data, this, "folders");
				}
			} 
		}
	}	
	
	updateServerPositions (folderdiv) {
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		if (data) {
			let servers = Array.from(this.foldercontent.querySelectorAll(`${BDFDB.dotCN.guild}.copy[folder="${folderdiv.id}"]`)).map(server => {
				return server.getAttribute("guild");
			});
			for (let serverid of servers) BDFDB.removeFromArray(data.servers, serverid);
			data.servers = servers.concat(data.servers);
			BDFDB.saveData(folderdiv.id, data, this, "folders");
		}
	}	
	
	updateFolderNotifications (folderdiv) {
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		var a = performance.now();
		if (!data) return;
		let includedServers = this.readIncludedServerList(folderdiv);
		let unreadServers = BDFDB.readUnreadServerList(includedServers);
		if (unreadServers.length > 0 && data.autounread) BDFDB.clearReadNotifications(unreadServers);
		else {
			let badgeAmount = 0;
			let audioEnabled = false;
			let videoEnabled = false;
			
			includedServers.forEach(div => {
				let badge = div.querySelector(BDFDB.dotCN.badge);
				if (badge) badgeAmount += parseInt(badge.innerText);
				if (div.classList.contains(BDFDB.disCN.guildaudio)) audioEnabled = true;
				if (div.classList.contains(BDFDB.disCN.guildvideo)) videoEnabled = true;
			});
			
			folderdiv.classList.toggle(BDFDB.disCN.guildunread, unreadServers.length > 0);
			folderdiv.classList.toggle(BDFDB.disCN.guildaudio, audioEnabled);
			folderdiv.classList.toggle(BDFDB.disCN.guildvideo, videoEnabled);
			let notifications = folderdiv.querySelector(".folder" + BDFDB.dotCN.badge + ".notifications");
			notifications.innerText = badgeAmount;	
			if (badgeAmount > 0) notifications.style.removeProperty("display");
			else notifications.style.setProperty("display", "none", "important");
			let amount = folderdiv.querySelector(".folder" + BDFDB.dotCN.badge + ".count");
			amount.innerText = includedServers.length;	
			if (includedServers.length > 0 && BDFDB.getData("showCountBadge", this, "settings")) amount.style.removeProperty("display");
			else amount.style.setProperty("display", "none", "important");
		
			if (folderdiv.classList.contains("open") && !document.querySelector(".foldercontent [folder='" + folderdiv.id + "']")) this.openCloseFolder(folderdiv);
		}
	}
	
	readIncludedServerList (folderdiv) {
		let data = BDFDB.loadData(folderdiv.id, this, "folders");
		let includedServers = [];
		if (data) for (let id of data.servers) {
			let div = BDFDB.getServerDiv(id);
			if (div) includedServers.push(div);
		}
		return includedServers;
	}
	
	addHoverBehaviour (div) {
		/* based on stuff from Zerebos */
		let divinner = div.querySelector(BDFDB.dotCN.guildinner);
		let divicon = div.querySelector(BDFDB.dotCN.guildicon);
		let backgroundColor = new this.Animations.Value(0);
		backgroundColor
			.interpolate({
				inputRange: [0, 1],
				outputRange: [this.DiscordConstants.Colors.CHANNELS_GREY, this.DiscordConstants.Colors.BRAND_PURPLE]
			})
			.addListener((value) => {
				if (divicon.classList.contains(BDFDB.disCN.avatarnoicon)) {
					let comp = BDFDB.colorCONVERT(value.value, "RGBCOMP");
					if (comp) divinner.style.setProperty("background-color", `rgb(${comp[0]}, ${comp[1]}, ${comp[2]})`);
				}
			});

		let borderRadius = new this.Animations.Value(0);
		borderRadius
			.interpolate({
				inputRange: [0, 1],
				outputRange: [25, 15]
			})
			.addListener((value) => {
				divinner.style.setProperty("border-radius", `${value.value}px`);
			});

		let animate = (v) => {
			this.Animations.parallel([
				this.Animations.timing(backgroundColor, {toValue: v, duration: 200}),
				this.Animations.spring(borderRadius, {toValue: v, friction: 3})
			]).start();
		};

		div.addEventListener("mouseenter", () => {animate(1);})
		div.addEventListener("mouseleave", () => {if (!div.classList.contains(BDFDB.disCN.guildselected)) animate(0);});
	}
	
	setLabelsByLanguage () {
		switch (BDFDB.getDiscordLanguage().id) {
			case "hr":		//croatian
				return {
					toast_addserver_text:					"${servername} je dodan u mapu${foldername}.",
					toast_removeserver_text:				"${servername} je uklonjena iz mape${foldername}.",
					servercontext_serverfolders_text:		"Poslužitelj mapu",
					serversubmenu_createfolder_text:		"Izradi mapu",
					serversubmenu_removefromfolder_text:	"Ukloni poslužitelj iz mape",
					foldercontext_unreadfolder_text:		"Oznaci sve kao procitano",
					foldercontext_autounreadfolder_text:	"Auto: Oznacite kao procitano",
					foldercontext_foldersettings_text:		"Postavke map",
					foldercontext_removefolder_text:		"Izbriši mapu",
					modal_header_text:						"Postavke mapa",
					modal_foldername_text:					"Naziv mape",
					modal_tabheader1_text:					"Mape",
					modal_tabheader2_text:					"Boja mape",
					modal_tabheader3_text:					"Boja tooltip",
					modal_tabheader4_text:					"Prilagodeni ikona",
					modal_iconpicker_text:					"Odabir mape",
					modal_colorpicker1_text:				"Boja primarne mape",
					modal_colorpicker2_text:				"Boja sekundarne mape",
					modal_colorpicker3_text:				"Boja tooltip",
					modal_colorpicker4_text:				"Boja fonta",
					modal_customopen_text:					"Otvori ikona",
					modal_customclosed_text:				"Zatvorena ikona",
					modal_custompreview_text:				"Pregled ikona",
					btn_cancel_text:						"Prekid",
					btn_save_text:							"Uštedjeti"
				};
			case "da":		//danish
				return {
					toast_addserver_text:					"${servername} er blevet tilføjet til mappe${foldername}.",
					toast_removeserver_text:				"${servername} er blevet fjernet fra mappen${foldername}.",
					servercontext_serverfolders_text:		"Servermapper",
					serversubmenu_createfolder_text:		"Opret mappe",
					serversubmenu_removefromfolder_text:	"Fjern server fra mappe",
					foldercontext_unreadfolder_text:		"Markér alle som læst",
					foldercontext_autounreadfolder_text:	"Auto: Markér som læst",
					foldercontext_foldersettings_text:		"Mappeindstillinger",
					foldercontext_removefolder_text:		"Slet mappe",
					modal_header_text:						"Mappindstillinger",
					modal_foldername_text:					"Mappenavn",
					modal_tabheader1_text:					"Mappe",
					modal_tabheader2_text:					"Mappefarve",
					modal_tabheader3_text:					"Tooltipfarve",
					modal_tabheader4_text:					"Brugerdefinerede ikoner",
					modal_iconpicker_text:					"Mappevalg",
					modal_colorpicker1_text:				"Primær mappefarve",
					modal_colorpicker2_text:				"Sekundær mappefarve",
					modal_colorpicker3_text:				"Tooltipfarve",
					modal_colorpicker4_text:				"Skriftfarve",
					modal_customopen_text:					"Åbn ikon",
					modal_customclosed_text:				"Lukket ikon",
					modal_custompreview_text:				"Ikon forhåndsvisning",
					btn_cancel_text:						"Afbryde",
					btn_save_text:							"Spare"
				};
			case "de":		//german
				return {
					toast_addserver_text:					"${servername} wurde dem Ordner${foldername} hinzugefügt.",
					toast_removeserver_text:				"${servername} wurde aus dem Ordner${foldername} entfernt.",
					servercontext_serverfolders_text:		"Serverordner",
					serversubmenu_createfolder_text:		"Ordner erzeugen",
					serversubmenu_removefromfolder_text:	"Server aus Ordner entfernen",
					foldercontext_unreadfolder_text:		"Alle als gelesen markieren",
					foldercontext_autounreadfolder_text:	"Auto: Als gelesen markieren",
					foldercontext_foldersettings_text:		"Ordnereinstellungen",
					foldercontext_removefolder_text:		"Ordner löschen",
					modal_header_text:						"Ordnereinstellungen",
					modal_foldername_text:					"Ordnername",
					modal_tabheader1_text:					"Ordner",
					modal_tabheader2_text:					"Ordnerfarbe",
					modal_tabheader3_text:					"Tooltipfarbe",
					modal_tabheader4_text:					"Eigene Icons",
					modal_iconpicker_text:					"Ordnerauswahl",
					modal_colorpicker1_text:				"Primäre Ordnerfarbe",
					modal_colorpicker2_text:				"Sekundäre Ordnerfarbe",
					modal_colorpicker3_text:				"Tooltipfarbe",
					modal_colorpicker4_text:				"Schriftfarbe",
					modal_customopen_text:					"Geöffnetes Icon",
					modal_customclosed_text:				"Geschlossenes Icon",
					modal_custompreview_text:				"Iconvorschau",
					btn_cancel_text:						"Abbrechen",
					btn_save_text:							"Speichern"
				};
			case "es":		//spanish
				return {
					toast_addserver_text:					"${servername} ha sido agregado a la carpeta${foldername}.",
					toast_removeserver_text:				"${servername} ha sido eliminado de la carpeta${foldername}.",
					servercontext_serverfolders_text:		"Carpetas de servidor",
					serversubmenu_createfolder_text:		"Crear carpeta",
					serversubmenu_removefromfolder_text:	"Eliminar servidor de la carpeta",
					foldercontext_unreadfolder_text:		"Marcar todo como leido",
					foldercontext_autounreadfolder_text:	"Auto: Marcar como leído",
					foldercontext_foldersettings_text:		"Ajustes de carpeta",
					foldercontext_removefolder_text:		"Eliminar carpeta",
					modal_header_text:						"Ajustes de carpeta",
					modal_foldername_text:					"Nombre de la carpeta",
					modal_tabheader1_text:					"Carpeta",
					modal_tabheader2_text:					"Color de carpeta",
					modal_tabheader3_text:					"Color de tooltip",
					modal_tabheader4_text:					"Iconos personalizados",
					modal_iconpicker_text:					"Selección de carpeta",
					modal_colorpicker1_text:				"Color primaria de carpeta",
					modal_colorpicker2_text:				"Color secundario de la carpeta",
					modal_colorpicker3_text:				"Color de tooltip",
					modal_colorpicker4_text:				"Color de fuente",
					modal_customopen_text:					"Ícono abierto",
					modal_customclosed_text:				"Icono cerrado",
					modal_custompreview_text:				"Vista previa del icono",
					btn_cancel_text:						"Cancelar",
					btn_save_text:							"Guardar"
				};
			case "fr":		//french
				return {
					toast_addserver_text:					"${servername} a été ajouté au dossier${foldername}.",
					toast_removeserver_text:				"${servername} a été supprimé du dossier${foldername}.",
					servercontext_serverfolders_text:		"Dossiers du serveur",
					serversubmenu_createfolder_text:		"Créer le dossier",
					serversubmenu_removefromfolder_text:	"Supprimer le serveur du dossier",
					foldercontext_unreadfolder_text:		"Tout marquer comme lu",
					foldercontext_autounreadfolder_text:	"Auto: Marquer comme lu",
					foldercontext_foldersettings_text:		"Paramètres du dossier",
					foldercontext_removefolder_text:		"Supprimer le dossier",
					modal_header_text:						"Paramètres du dossier",
					modal_foldername_text:					"Nom de dossier",
					modal_tabheader1_text:					"Dossier",
					modal_tabheader2_text:					"Couleur du dossier",
					modal_tabheader3_text:					"Couleur de tooltip",
					modal_tabheader4_text:					"Icônes personnalisées",
					modal_iconpicker_text:					"Choix du dossier",
					modal_colorpicker1_text:				"Couleur primaire du dossier",
					modal_colorpicker2_text:				"Couleur secondaire du dossier",
					modal_colorpicker3_text:				"Couleur de tooltip",
					modal_colorpicker4_text:				"Couleur de la police",
					modal_customopen_text:					"Icône ouverte",
					modal_customclosed_text:				"Icône fermée",
					modal_custompreview_text:				"Aperçu de l'icône",
					btn_cancel_text:						"Abandonner",
					btn_save_text:							"Enregistrer"
				};
			case "it":		//italian
				return {
					toast_addserver_text:					"${servername} è stato aggiunto alla cartella${foldername}.",
					toast_removeserver_text:				"${servername} è stato rimosso dalla cartella${foldername}.",
					servercontext_serverfolders_text:		"Cartelle del server",
					serversubmenu_createfolder_text:		"Creare una cartella",
					serversubmenu_removefromfolder_text:	"Rimuovere il server dalla cartella",
					foldercontext_unreadfolder_text:		"Segna tutti come letti",
					foldercontext_autounreadfolder_text:	"Auto: Contrassegna come letto",
					foldercontext_foldersettings_text:		"Impostazioni cartella",
					foldercontext_removefolder_text:		"Elimina cartella",
					modal_header_text:						"Impostazioni cartella",
					modal_foldername_text:					"Nome della cartella",
					modal_tabheader1_text:					"Cartella",
					modal_tabheader2_text:					"Colore della cartella",
					modal_tabheader3_text:					"Colore della tooltip",
					modal_tabheader4_text:					"Icone personalizzate",
					modal_iconpicker_text:					"Selezione della cartella",
					modal_colorpicker1_text:				"Colore primaria della cartella",
					modal_colorpicker2_text:				"Colore secondaria della cartella",
					modal_colorpicker3_text:				"Colore della tooltip",
					modal_colorpicker4_text:				"Colore del carattere",
					modal_customopen_text:					"Icona aperta",
					modal_customclosed_text:				"Icona chiusa",
					modal_custompreview_text:				"Icona anteprima",
					btn_cancel_text:						"Cancellare",
					btn_save_text:							"Salvare"
				};
			case "nl":		//dutch
				return {
					toast_addserver_text:					"${servername} is toegevoegd aan de map${foldername}.",
					toast_removeserver_text:				"${servername} is verwijderd uit de map${foldername}.",
					servercontext_serverfolders_text:		"Servermappen",
					serversubmenu_createfolder_text:		"Map aanmaken",
					serversubmenu_removefromfolder_text:	"Server uit map verwijderen",
					foldercontext_unreadfolder_text:		"Alles als gelezen markeren",
					foldercontext_autounreadfolder_text:	"Auto: Markeren als gelezen",
					foldercontext_foldersettings_text:		"Mapinstellingen",
					foldercontext_removefolder_text:		"Verwijder map",
					modal_header_text:						"Mapinstellingen",
					modal_foldername_text:					"Mapnaam",
					modal_tabheader1_text:					"Map",
					modal_tabheader2_text:					"Mapkleur",
					modal_tabheader3_text:					"Tooltipkleur",
					modal_tabheader4_text:					"Aangepaste keuze",
					modal_iconpicker_text:					"Map keuze",
					modal_colorpicker1_text:				"Primaire mapkleur",
					modal_colorpicker2_text:				"Tweede mapkleur",
					modal_colorpicker3_text:				"Tooltipkleur",
					modal_colorpicker4_text:				"Doopvontkleur",
					modal_customopen_text:					"Geopende keuze",
					modal_customclosed_text:				"Gesloten keuze",
					modal_custompreview_text:				"Voorbeeld van keuze",
					btn_cancel_text:						"Afbreken",
					btn_save_text:							"Opslaan"
				};
			case "no":		//norwegian
				return {
					toast_addserver_text:					"${servername} er lagt til i mappe${foldername}.",
					toast_removeserver_text:				"${servername} er fjernet fra mappen${foldername}.",
					servercontext_serverfolders_text:		"Servermapper",
					serversubmenu_createfolder_text:		"Lag mappe",
					serversubmenu_removefromfolder_text:	"Fjern server fra mappe",
					foldercontext_unreadfolder_text:		"Marker alle som lest",
					foldercontext_autounreadfolder_text:	"Auto: Merk som les",
					foldercontext_foldersettings_text:		"Mappinnstillinger",
					foldercontext_removefolder_text:		"Slett mappe",
					modal_header_text:						"Mappinnstillinger",
					modal_foldername_text:					"Mappenavn",
					modal_tabheader1_text:					"Mappe",
					modal_tabheader2_text:					"Mappefarge",
					modal_tabheader3_text:					"Tooltipfarge",
					modal_tabheader4_text:					"Tilpassede ikoner",
					modal_iconpicker_text:					"Mappevalg",
					modal_colorpicker1_text:				"Primær mappefarge",
					modal_colorpicker2_text:				"Sekundær mappefarge",
					modal_colorpicker3_text:				"Tooltipfarge",
					modal_colorpicker4_text:				"Skriftfarge",
					modal_customopen_text:					"Åpnet ikon",
					modal_customclosed_text:				"Lukket ikon",
					modal_custompreview_text:				"Ikon forhåndsvisning",
					btn_cancel_text:						"Avbryte",
					btn_save_text:							"Lagre"
				};
			case "pl":		//polish
				return {
					toast_addserver_text:					"${servername} zostal dodany do folderu${foldername}.",
					toast_removeserver_text:				"${servername} zostal usuniety z folderu${foldername}.",
					servercontext_serverfolders_text:		"Foldery serwera",
					serversubmenu_createfolder_text:		"Utwórz folder",
					serversubmenu_removefromfolder_text:	"Usun serwer z folderu",
					foldercontext_unreadfolder_text:		"Oznacz wszystkie jako przeczytane",
					foldercontext_autounreadfolder_text:	"Auto: Oznacz jako przeczytane",
					foldercontext_foldersettings_text:		"Ustawienia folderu",
					foldercontext_removefolder_text:		"Usun folder",
					modal_header_text:						"Ustawienia folderu",
					modal_foldername_text:					"Nazwa folderu",
					modal_tabheader1_text:					"Folder",
					modal_tabheader2_text:					"Kolor folderu",
					modal_tabheader3_text:					"Kolor podpowiedzi",
					modal_tabheader4_text:					"Niestandardowe ikony",
					modal_iconpicker_text:					"Wybór folderu",
					modal_colorpicker1_text:				"Podstawowy kolor folderu",
					modal_colorpicker2_text:				"Drugorzedny kolor folderu",
					modal_colorpicker3_text:				"Kolor podpowiedzi",
					modal_colorpicker4_text:				"Kolor czcionki",
					modal_customopen_text:					"Otwarta ikona",
					modal_customclosed_text:				"Zamknieta ikona",
					modal_custompreview_text:				"Podglad ikony",
					btn_cancel_text:						"Anuluj",
					btn_save_text:							"Zapisz"
				};
			case "pt-BR":	//portuguese (brazil)
				return {
					toast_addserver_text:					"${servername} foi adicionado à pasta${foldername}.",
					toast_removeserver_text:				"${servername} foi removido da pasta${foldername}.",
					servercontext_serverfolders_text:		"Pastas de servidores",
					serversubmenu_createfolder_text:		"Criar pasta",
					serversubmenu_removefromfolder_text:	"Remover servidor da pasta",
					foldercontext_unreadfolder_text:		"Marcar tudo como lido",
					foldercontext_autounreadfolder_text:	"Auto: Marcar como lido",
					foldercontext_foldersettings_text:		"Configurações da pasta",
					foldercontext_removefolder_text:		"Excluir pasta",
					modal_header_text:						"Configurações da pasta",
					modal_foldername_text:					"Nome da pasta",
					modal_tabheader1_text:					"Pasta",
					modal_tabheader2_text:					"Cor da pasta",
					modal_tabheader3_text:					"Cor da tooltip",
					modal_tabheader4_text:					"Ícones personalizados",
					modal_iconpicker_text:					"Escolha da pasta",
					modal_colorpicker1_text:				"Cor primária da pasta",
					modal_colorpicker2_text:				"Cor secundária da pasta",
					modal_colorpicker3_text:				"Cor da tooltip",
					modal_colorpicker4_text:				"Cor da fonte",
					modal_customopen_text:					"Ícone aberto",
					modal_customclosed_text:				"Ícone fechado",
					modal_custompreview_text:				"Pré-visualização de ícones",
					btn_cancel_text:						"Cancelar",
					btn_save_text:							"Salvar"
				};
			case "fi":		//finnish
				return {
					toast_addserver_text:					"${servername} on lisätty kansioon${foldername}.",
					toast_removeserver_text:				"${servername} on poistettu kansioon${foldername}.",
					servercontext_serverfolders_text:		"Palvelinkansiot",
					serversubmenu_createfolder_text:		"Luo kansio",
					serversubmenu_removefromfolder_text:	"Poista palvelin kansioista",
					foldercontext_unreadfolder_text:		"Merkitse kaikki luetuksi",
					foldercontext_autounreadfolder_text:	"Auto: merkitse luettavaksi",
					foldercontext_foldersettings_text:		"Kansion kansio",
					foldercontext_removefolder_text:		"Poista kansio",
					modal_header_text:						"Kansion kansio",
					modal_foldername_text:					"Kansion nimi",
					modal_tabheader1_text:					"Kansio",
					modal_tabheader2_text:					"Kansionväri",
					modal_tabheader3_text:					"Tooltipväri",
					modal_tabheader4_text:					"Mukautetut kuvakkeet",
					modal_iconpicker_text:					"Kansion valinta",
					modal_colorpicker1_text:				"Ensisijainen kansionväri",
					modal_colorpicker2_text:				"Toissijainen kansionväri",
					modal_colorpicker3_text:				"Tooltipväri",
					modal_colorpicker4_text:				"Fontinväri",
					modal_customopen_text:					"Avattu kuvake",
					modal_customclosed_text:				"Suljettu kuvake",
					modal_custompreview_text:				"Kuvakkeen esikatselu",
					btn_cancel_text:						"Peruuttaa",
					btn_save_text:							"Tallentaa"
				};
			case "sv":		//swedish
				return {
					toast_addserver_text:					"${servername} har lagts till i mapp${foldername}.",
					toast_removeserver_text:				"${servername} har tagits bort från mappen${foldername}.",
					servercontext_serverfolders_text:		"Servermappar",
					serversubmenu_createfolder_text:		"Skapa mapp",
					serversubmenu_removefromfolder_text:	"Ta bort servern från mappen",
					foldercontext_unreadfolder_text:		"Markera allt som läst",
					foldercontext_autounreadfolder_text:	"Auto: Markera som Läs",
					foldercontext_foldersettings_text:		"Mappinställningar",
					foldercontext_removefolder_text:		"Ta bort mapp",
					modal_header_text:						"Mappinställningar",
					modal_foldername_text:					"Mappnamn",
					modal_tabheader1_text:					"Mapp",
					modal_tabheader2_text:					"Mappfärg",
					modal_tabheader3_text:					"Tooltipfärg",
					modal_tabheader4_text:					"Anpassade ikoner",
					modal_iconpicker_text:					"Mappval",
					modal_colorpicker1_text:				"Primär mappfärg",
					modal_colorpicker2_text:				"Sekundär mappfärg",
					modal_colorpicker3_text:				"Tooltipfärg",
					modal_colorpicker4_text:				"Fontfärg",
					modal_customopen_text:					"Öppnad ikon",
					modal_customclosed_text:				"Closed Icon",
					modal_custompreview_text:				"Ikon förhandsvisning",
					btn_cancel_text:						"Avbryta",
					btn_save_text:							"Spara"
				};
			case "tr":		//turkish
				return {
					toast_addserver_text:					"${servername} klasörü${foldername} eklendi.",
					toast_removeserver_text:				"${servername} klasörü${foldername} kaldirildi",
					servercontext_serverfolders_text:		"Sunucu klasörleri",
					serversubmenu_createfolder_text:		"Klasör olusturun",
					serversubmenu_removefromfolder_text:	"Sunucuyu klasörden kaldir",
					foldercontext_unreadfolder_text:		"Tümünü Oku olarak isaretle",
					foldercontext_autounreadfolder_text:	"Oto: Okundu Olarak Isaretle",
					foldercontext_foldersettings_text:		"Klasör Ayarlari",
					foldercontext_removefolder_text:		"Klasörü sil",
					modal_header_text:						"Klasör Ayarlari",
					modal_foldername_text:					"Klasör adi",
					modal_tabheader1_text:					"Klasör",
					modal_tabheader2_text:					"Klasör rengi",
					modal_tabheader3_text:					"Tooltip rengi",
					modal_tabheader4_text:					"Özel simgeler",
					modal_iconpicker_text:					"Klasör seçimi",
					modal_colorpicker1_text:				"Birincil klasör rengi",
					modal_colorpicker2_text:				"Ikincil klasör rengi",
					modal_colorpicker3_text:				"Tooltip rengi",
					modal_colorpicker4_text:				"Yazi rengi",
					modal_customopen_text:					"Açilmis simge",
					modal_customclosed_text:				"Kapali simge",
					modal_custompreview_text:				"Simge önizleme",
					btn_cancel_text:						"Iptal",
					btn_save_text:							"Kayit"
				};
			case "cs":		//czech
				return {
					toast_addserver_text:					"${servername} byl pridán do složky${foldername}.",
					toast_removeserver_text:				"${servername} byl odstranen ze složky${foldername}.",
					servercontext_serverfolders_text:		"Složky serveru",
					serversubmenu_createfolder_text:		"Vytvorit složky",
					serversubmenu_removefromfolder_text:	"Odstranit server ze složky",
					foldercontext_unreadfolder_text:		"Oznacit vše jako prectené",
					foldercontext_autounreadfolder_text:	"Auto: Oznacit jako prectené",
					foldercontext_foldersettings_text:		"Nastavení složky",
					foldercontext_removefolder_text:		"Smazat složky",
					modal_header_text:						"Nastavení složky",
					modal_foldername_text:					"Název složky",
					modal_tabheader1_text:					"Složky",
					modal_tabheader2_text:					"Barva složky",
					modal_tabheader3_text:					"Barva tooltip",
					modal_tabheader4_text:					"Vlastní ikony",
					modal_iconpicker_text:					"Volba složky",
					modal_colorpicker1_text:				"Primární barva složky",
					modal_colorpicker2_text:				"Sekundární barva složky",
					modal_colorpicker3_text:				"Barva tooltip",
					modal_colorpicker4_text:				"Barva fontu",
					modal_customopen_text:					"Otevrená ikona",
					modal_customclosed_text:				"Uzavrená ikona",
					modal_custompreview_text:				"Náhled ikony",
					btn_cancel_text:						"Zrušení",
					btn_save_text:							"Uložit"
				};
			case "bg":		//bulgarian
				return {
					toast_addserver_text:					"${servername} ? ??????? ??? ???????${foldername}.",
					toast_removeserver_text:				"${servername} ? ????????? ?? ???????${foldername}.",
					servercontext_serverfolders_text:		"???????? ?????",
					serversubmenu_createfolder_text:		"?????? ?????",
					serversubmenu_removefromfolder_text:	"?????????? ?? ?????? ?? ?????",
					foldercontext_unreadfolder_text:		"???????? ?????? ???? ?????????",
					foldercontext_autounreadfolder_text:	"????: ????????? ???? ??????",
					foldercontext_foldersettings_text:		"????????? ?????",
					foldercontext_removefolder_text:		"????????? ?? ?????",
					modal_header_text:						"????????? ?????",
					modal_foldername_text:					"??? ?? ?????",
					modal_tabheader1_text:					"?????",
					modal_tabheader2_text:					"???? ?? ?????",
					modal_tabheader3_text:					"???? ?? ?????????",
					modal_tabheader4_text:					"??????????????? ?????",
					modal_iconpicker_text:					"????? ?? ?????",
					modal_colorpicker1_text:				"???? ???????? ?? ?????",
					modal_colorpicker2_text:				"???? ???????? ?? ?????",
					modal_colorpicker3_text:				"???? ?? ?????????",
					modal_colorpicker4_text:				"???? ?? ??????",
					modal_customopen_text:					"???????? ?????",
					modal_customclosed_text:				"????????? ?????",
					modal_custompreview_text:				"????? ???????",
					btn_cancel_text:						"???????",
					btn_save_text:							"C????????"
				};
			case "ru":		//russian
				return {
					toast_addserver_text:					"${servername} ???????? ? ?????${foldername}.",
					toast_removeserver_text:				"${servername} ??? ?????? ?? ?????${foldername}.",
					servercontext_serverfolders_text:		"????? ???????",
					serversubmenu_createfolder_text:		"??????? ?????",
					serversubmenu_removefromfolder_text:	"???????? ??????? ?? ?????",
					foldercontext_unreadfolder_text:		"???????? ??? ??? ???????????",
					foldercontext_autounreadfolder_text:	"????: ???????? ??? ???????????",
					foldercontext_foldersettings_text:		"????????? ?????",
					foldercontext_removefolder_text:		"??????? ?????",
					modal_header_text:						"????????? ?????",
					modal_foldername_text:					"??? ?????",
					modal_tabheader1_text:					"?????",
					modal_tabheader2_text:					"???? ?????",
					modal_tabheader3_text:					"???? ?????????",
					modal_tabheader4_text:					"???????????????? ??????",
					modal_iconpicker_text:					"????? ?????",
					modal_colorpicker1_text:				"???? ???????? ?????",
					modal_colorpicker2_text:				"???? ????????? ?????",
					modal_colorpicker3_text:				"???? ?????????",
					modal_colorpicker4_text:				"???? ??????",
					modal_customopen_text:					"???????? ??????",
					modal_customclosed_text:				"???????? ??????",
					modal_custompreview_text:				"?????? ????????",
					btn_cancel_text:						"??????",
					btn_save_text:							"C?????"
				};
			case "uk":		//ukrainian
				return {
					toast_addserver_text:					"${servername} ???? ?????? ?? ?????${foldername}.",
					toast_removeserver_text:				"${servername} ??? ????????? ? ?????${foldername}.",
					servercontext_serverfolders_text:		"????? ???????",
					serversubmenu_createfolder_text:		"???????? ?????",
					serversubmenu_removefromfolder_text:	"???????? ?????? ?? ?????",
					foldercontext_unreadfolder_text:		"????????? ?? ?????????",
					foldercontext_autounreadfolder_text:	"????: ????????? ?? ?????????",
					foldercontext_foldersettings_text:		"????????? ?????",
					foldercontext_removefolder_text:		"???????? ?????",
					modal_header_text:						"????????? ?????",
					modal_foldername_text:					"??'? ?????",
					modal_tabheader1_text:					"?????",
					modal_tabheader2_text:					"????? ?????",
					modal_tabheader3_text:					"????? ????????",
					modal_tabheader4_text:					"????????????????? ??????",
					modal_iconpicker_text:					"????? ?????",
					modal_colorpicker1_text:				"????? ???????? ?????",
					modal_colorpicker2_text:				"????? ?????????? ?????",
					modal_colorpicker3_text:				"????? ????????",
					modal_colorpicker4_text:				"????? ??????",
					modal_customopen_text:					"???????? ?????",
					modal_customclosed_text:				"??????? ?????",
					modal_custompreview_text:				"?????????? ???????????? ?????????",
					btn_cancel_text:						"?????????",
					btn_save_text:							"????????"
				};
			case "ja":		//japanese
				return {
					toast_addserver_text:					"${servername} ?????${foldername} ?????????",
					toast_removeserver_text:				"${servername} ?????${foldername} ??????????",
					servercontext_serverfolders_text:		"????????",
					serversubmenu_createfolder_text:		"????????",
					serversubmenu_removefromfolder_text:	"???????????????",
					foldercontext_unreadfolder_text:		"??????????????",
					foldercontext_autounreadfolder_text:	"??: ????????????",
					foldercontext_foldersettings_text:		"??????",
					foldercontext_removefolder_text:		"?????????",
					modal_header_text:						"??????",
					modal_foldername_text:					"?????",
					modal_tabheader1_text:					"????",
					modal_tabheader2_text:					"??????",
					modal_tabheader3_text:					"????????",
					modal_tabheader4_text:					"????????",
					modal_iconpicker_text:					"???????",
					modal_colorpicker1_text:				"???????????",
					modal_colorpicker2_text:				"???????????",
					modal_colorpicker3_text:				"????????",
					modal_colorpicker4_text:				"??????",
					modal_customopen_text:					"???????",
					modal_customclosed_text:				"?????????",
					modal_custompreview_text:				"??????????",
					btn_cancel_text:						"?????",
					btn_save_text:							"???"
				};
			case "zh-TW":	//chinese (traditional)
				return {
					toast_addserver_text:					"${servername} ????????${foldername}.",
					toast_removeserver_text:				"${servername} ?????${foldername} ???.",
					servercontext_serverfolders_text:		"??????",
					serversubmenu_createfolder_text:		"?????",
					serversubmenu_removefromfolder_text:	"??????????",
					foldercontext_unreadfolder_text:		"?????",
					foldercontext_autounreadfolder_text:	"??: ?????",
					foldercontext_foldersettings_text:		"?????",
					foldercontext_removefolder_text:		"?????",
					modal_header_text:						"?????",
					modal_foldername_text:					"?????",
					modal_tabheader1_text:					"?",
					modal_tabheader2_text:					"?????",
					modal_tabheader3_text:					"??????",
					modal_tabheader4_text:					"?????",
					modal_iconpicker_text:					"?????",
					modal_colorpicker1_text:				"??????",
					modal_colorpicker2_text:				"???????",
					modal_colorpicker3_text:				"??????",
					modal_colorpicker4_text:				"????",
					modal_customopen_text:					"?????",
					modal_customclosed_text:				"?????",
					modal_custompreview_text:				"????",
					btn_cancel_text:						"??",
					btn_save_text:							"??"
				};
			case "ko":		//korean
				return {
					toast_addserver_text:					"${servername} ? ??${foldername} ? ???????.",
					toast_removeserver_text:				"${servername} ? ??${foldername} ?? ???????.",
					servercontext_serverfolders_text:		"?? ??",
					serversubmenu_createfolder_text:		"?? ???",
					serversubmenu_removefromfolder_text:	"???? ?? ??",
					foldercontext_unreadfolder_text:		"?? ?? ??? ??",
					foldercontext_autounreadfolder_text:	"??: ?? ??? ??",
					foldercontext_foldersettings_text:		"?? ??",
					foldercontext_removefolder_text:		"?? ??",
					modal_header_text:						"?? ??",
					modal_foldername_text:					"?? ??",
					modal_tabheader1_text:					"??",
					modal_tabheader2_text:					"?? ?",
					modal_tabheader3_text:					"?? ??",
					modal_tabheader4_text:					"??? ?? ???",
					modal_iconpicker_text:					"?? ??",
					modal_colorpicker1_text:				"?? ?? ?",
					modal_colorpicker2_text:				"?? ?? ?",
					modal_colorpicker3_text:				"?? ??",
					modal_colorpicker4_text:				"?? ??",
					modal_customopen_text:					"?? ???",
					modal_customclosed_text:				"?? ???",
					modal_custompreview_text:				"??? ????",
					btn_cancel_text:						"??",
					btn_save_text:							"??"
				};
			default:		//default: english
				return {
					toast_addserver_text:					"${servername} has been added to the folder${foldername}.",
					toast_removeserver_text:				"${servername} has been removed from the folder${foldername}.",
					servercontext_serverfolders_text:		"Serverfolders",
					serversubmenu_createfolder_text:		"Create Folder",
					serversubmenu_removefromfolder_text:	"Remove Server From Folder",
					foldercontext_unreadfolder_text:		"Mark All As Read",
					foldercontext_autounreadfolder_text:	"Auto: Mark As Read",
					foldercontext_foldersettings_text:		"Foldersettings",
					foldercontext_removefolder_text:		"Delete Folder",
					modal_header_text:						"Foldersettings",
					modal_foldername_text:					"Foldername",
					modal_tabheader1_text:					"Folder",
					modal_tabheader2_text:					"Foldercolor",
					modal_tabheader3_text:					"Tooltipcolor",
					modal_tabheader4_text:					"Custom Icons",
					modal_iconpicker_text:					"Folderchoice",
					modal_colorpicker1_text:				"Primary Foldercolor",
					modal_colorpicker2_text:				"Secondary Foldercolor",
					modal_colorpicker3_text:				"Tooltipcolor",
					modal_colorpicker4_text:				"Fontcolor",
					modal_customopen_text:					"Open Icon",
					modal_customclosed_text:				"Closed Icon",
					modal_custompreview_text:				"Iconpreview",
					btn_cancel_text:						"Cancel",
					btn_save_text:							"Save"
				};
		}
	}
}
