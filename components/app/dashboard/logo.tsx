import { GitPullRequestDraft } from 'lucide-react';
import React from 'react';

const Logo: React.FC = () => {
    return (
        <div>
            <GitPullRequestDraft className="bg-green-800  bg-gradient-to-t from-green-700 to-green-400 border border-b-green-100 w-10 h-8 " />
        </div>
    );
};

export default Logo;
